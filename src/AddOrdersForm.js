import {useReducer} from 'react'

function AddOrdersForm(props) {

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
    const initState = {buy: 0, quantity: 0}
    const [state, dispatch] = useReducer(reducer, initState)

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(state)
        return console.log("Submitted!")
    }

    const onChange = ({target}) => dispatch({
        type: target.name, payload: target.value
    })

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="buy">Buy Price</label>
                    <input onChange={onChange} type="number" name="buy" id="buy"/>
                </div>
                <div className="col-6">
                    <label htmlFor="quantity">Quantity Price</label>
                    <input onChange={onChange} type="number" name="quantity" id="quantity"/>
                </div>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default AddOrdersForm