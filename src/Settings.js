function SettingsForm({formInitState: initState, formState: [state, dispatch]}) {

    const onChange = ({target}) => dispatch({
        type: target.name, payload: target.value
    })


    return (
        <form>
            <div className="row">
                <div className="col-6">
                    <div>
                        <label htmlFor="percentage">Profit Percentage</label>
                        <input type="number"
                               name="percentage"
                               id="percentage"
                               onChange={onChange}
                               value={state.percentage} />
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <label htmlFor="fee">Fee</label>
                        <input type="number"
                               name="fee"
                               id="fee"
                               onChange={onChange}
                               value={state.fee} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="buy">Buy Currency</label>
                    <input type="text"
                           name="buy"
                           id="buy"
                           onChange={onChange}
                           value={state.buy} />
                </div>
                <div className="col-6">
                    <label htmlFor="sell">Sell Currency</label>
                    <input type="text"
                           name="sell"
                           id="sell"
                           onChange={onChange}
                           value={state.sell} />
                </div>
            </div>

        </form>
    )
}

export default SettingsForm