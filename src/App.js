import 'simple-css-grid/css/simple-grid.css'
import './style.css'
import {getEndingCalc, withTotalValue, withOrdersCalc, objToFixed, arrToFixed} from './calc'
import AddOrdersForm from './AddOrdersForm'

function App() {
    const orders_list = [
        {status: false, buy: 137.5, quantity: 39.564},
        {status: false, buy: 135, quantity: 28.208},
        {status: false, buy: 133, quantity: 12.271},
    ];
    const orders_enhanced = orders_list.map(withTotalValue).reduce(withOrdersCalc, []);
    const orders = arrToFixed(orders_enhanced);
    const summary = objToFixed(getEndingCalc(orders_enhanced));
    return (
        <div className="content-container">

            {/* Add Order Form */}
            <details open>
                <summary><h2>Add Order</h2></summary>
                <div className="card">
                    <div className="card-body">
                        <AddOrdersForm />
                    </div>
                </div>

            </details>


            {/* Order */}
            <details open>
                <summary><h2>Orders</h2> <small>({orders.length})</small></summary>
                {orders.map((order, i) => (
                    <div className="card" key={i}>
                        <details>
                            <summary className="card-header">
                                <h3> Buy ({i + 1})</h3>
                                <small>
                                    <span className="num">{order.buy}</span> *
                                    <span className="num">{order.quantity}</span> =
                                    <span className="num">{order.value}</span></small>
                            </summary>
                            <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <ul>
                                                <li>
                                                    <span className="left">Buy Price:</span>
                                                    <span className="right num">{order.buy}</span>
                                                </li>
                                                <li>
                                                    <span className="left">Quantity:</span>
                                                    <span className="right num">{order.quantity}</span>
                                                </li>
                                                <li>
                                                    <span className="left">Value:</span>
                                                    <span className="right num">{order.total_orders_value}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <ul>
                                                <li>
                                                    <span className="left">Sell Price:</span>
                                                    <span className="right num">{order.sell_price}</span>
                                                </li>
                                                <li>
                                                    <span className="left">Estimated Profit:</span>
                                                    <span className="right num">{order.estimated_profit}</span>
                                                </li>
                                                <li>
                                                    <span className="left">Value After Sell:</span>
                                                    <span className="right num">{order.value_after_sell}</span>
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
                                    <small>({summary.total_orders_quantity})</small>
                                </span>
                            </li>
                            <li>
                                <span className="left">Total Value After Sell:</span>
                                <span className="right num">
                                    {summary.value_after_sell}
                                    <small>({summary.estimated_profit})</small>
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
