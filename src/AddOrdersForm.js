function AddOrdersForm({
                           formInitState: initState,
                           formState: [state, dispatch],
                           dataState: [data, setData]
                       }) {

    const onSubmit = (e) => {
        e.preventDefault()
        const id = '_' + Math.random().toString(36).substr(2, 9);
        setData([
            ...data,
            {...state, id}
        ])
        console.log("a new order has been added.")
    }

    const onChange = ({target}) => dispatch({
        type: target.name, payload: parseFloat(target.value)
    })

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="buy">Buy Price</label>
                    <input onChange={onChange} defaultValue={initState.buy}
                           type="number" name="buy" id="buy"/>
                </div>
                <div className="col-6">
                    <label htmlFor="quantity">Quantity</label>
                    <input onChange={onChange} defaultValue={initState.quantity}
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