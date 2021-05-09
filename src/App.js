import 'simple-css-grid/css/simple-grid.css'
import './style.css'

import {useReducer, useState} from "react";
import AddOrdersForm from './AddOrdersForm'
import SettingsForm from './Settings'
import {getEndingCalc, withTotalValue, withOrdersCalc, objToFixed, arrToFixed} from './calc'
import {Currency} from './currency'

function App() {
    // profit percentage
    const initSettings = { percentage:0.02, buy:"ETC", sell:"USDT", fee: "0.0075"}
    const settingsReducer = (state, action) =>{
        switch (action.type){
            case 'percentage':
                return {...state, percentage: action.payload}
            case 'buy':
                return {...state, buy: action.payload}
            case 'sell':
                return {...state, sell: action.payload}
            case 'fee':
                return {...state, sell: action.payload}
            default:
                throw new Error()
        }
    }
    const [settings, setSettings] = useReducer(settingsReducer, initSettings)

    // form state
    const reducer = (state, action) => {
        switch (action.type) {
            case 'buy':
                return {...state, buy: action.payload}
            case 'quantity':
                return {...state, quantity: action.payload}
            default:
                throw new Error()
        }
    }
    const formInitState = {buy: 0, quantity: 0}
    const formState = useReducer(reducer, formInitState)

    // order state
    const OrdersInit = [
        {id: '_veldng1fb', buy: 137.5, quantity: 39.564},
        {id: '_ybmdos8ev', buy: 135, quantity: 28.208},
        {id: '_d37395pou', buy: 133, quantity: 12.271},
    ];
    const [orders_list, setOrders] = useState(OrdersInit)

    // order calculations
    const orders_enhanced = orders_list.map(withTotalValue)
                                       .reduce(withOrdersCalc(settings.percentage), []);
    const orders = arrToFixed(orders_enhanced);
    const summary = objToFixed(getEndingCalc(orders_enhanced, settings.percentage));

    // remove orders
    const onRemoveOrder = ({target}) => {
        const orderId = target.dataset.orderid
        const listAfterRemoval = orders.filter(order => order.id !== orderId)
        setOrders(listAfterRemoval)
        console.log("The order has been removed.")
    }

    return (
        <div className="content-container">

            {/* settings form*/}
            <details open>
                <summary><h2>Settings</h2></summary>
                <div className="card">
                    <div className="card-body">
                        <SettingsForm
                            formInitState={initSettings}
                            formState={[settings, setSettings]}
                        />
                    </div>
                </div>
            </details>

            {/* Add Order Form */}
            <details open>
                <summary><h2>Add Order</h2></summary>
                <div className="card">
                    <div className="card-body">
                        <AddOrdersForm
                            formInitState={formInitState}
                            formState={formState}
                            dataState={[orders_list, setOrders]}
                            settings={settings}
                        />
                    </div>
                </div>
            </details>

            {/* Order */}
            <details open>
                <summary><h2>Orders</h2> <small>({orders.length})</small></summary>
                {orders.map((order, i) => (
                    <div className="card" key={order.id}>
                        <details>
                            <summary className="card-header">
                                <h3> Buy ({i + 1})</h3>
                                <small>
                                    <span className="num">
                                        {order.buy}
                                        <Currency settings={settings} type="buy" />
                                    </span> *
                                    <span className="num">{order.quantity}</span> =
                                    <span className="num">
                                        {order.value}
                                        <Currency settings={settings} type="sell" />
                                    </span>
                                </small>
                                <button type="submit"
                                        className="remove"
                                        onClick={onRemoveOrder}
                                        data-orderid={order.id}>x
                                </button>
                            </summary>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6">
                                        <ul>
                                            <li>
                                                <span className="left">Buy Price:</span>
                                                <span className="right num">
                                                    {order.buy}
                                                    <Currency settings={settings} type="buy" />
                                                </span>
                                            </li>
                                            <li>
                                                <span className="left">Quantity:</span>
                                                <span className="right num">{order.quantity}</span>
                                            </li>
                                            <li>
                                                <span className="left">Value:</span>
                                                <span className="right num">
                                                    {order.total_orders_value}
                                                    <Currency settings={settings} type="sell" />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <ul>
                                            <li>
                                                <span className="left">Sell Price:</span>
                                                <span className="right num">
                                                    {order.sell_price}
                                                    <Currency settings={settings} type="sell" />
                                                </span>
                                            </li>
                                            <li>
                                                <span className="left">Estimated Profit:</span>
                                                <span className="right num">
                                                    {order.estimated_profit}
                                                    <Currency settings={settings} type="sell" />
                                                </span>
                                            </li>
                                            <li>
                                                <span className="left">Value After Sell:</span>
                                                <span className="right num">
                                                    {order.value_after_sell}
                                                    <Currency settings={settings} type="sell" />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </details>

                    </div>
                ))}
            </details>

            {/* Summary */}
            <details open>
                <summary><h2>Summary</h2></summary>
                <div className="card">
                    <div className="card-body">
                        <ul>
                            <li>
                                <span className="left">Total Trade Value:</span>
                                <span className="right num">
                                    {summary.total_orders_value}
                                    <Currency settings={settings} type="sell" />
                                    <small>
                                        ({summary.total_orders_quantity} <Currency settings={settings} type="buy" />)

                                    </small>
                                </span>
                            </li>
                            <li>
                                <span className="left">Total Value After Sell:</span>
                                <span className="right num">
                                    {summary.value_after_sell} <Currency settings={settings} type="sell" />
                                    <small>(Profit: {summary.estimated_profit} <Currency settings={settings} type="sell" />)</small>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </details>
        </div>
    )
}

export default App;
