import {Currency} from "./currency";

function AddOrdersForm({
                           formInitState: initState,
                           formState: [state, dispatch],
                           dataState: [data, setData],
                           settings
                       }) {

    const onSubmit = (e) => {
        e.preventDefault()
        const id = '_' + Math.random().toString(36).substr(2, 9);
        setData([...data, {...state, id, state:0} ])
        console.log("a new order has been added.")
    }

    const onChange = ({target}) => dispatch({
        type: target.name, payload: parseFloat(target.value)
    })

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="buyPrice">
                        Buy Price <Currency settings={settings} type="buy" />
                    </label>
                    <input onChange={onChange} value={state.buy}
                           type="number" name="buy" id="buyPrice"/>
                </div>
                <div className="col-6">
                    <label htmlFor="quantity">Quantity</label>
                    <input onChange={onChange} value={state.quantity}
                           type="number" name="quantity" id="quantity"/>
                </div>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default AddOrdersForm