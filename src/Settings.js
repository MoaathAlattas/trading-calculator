function SettingsForm({formInitState: initState, formState: [_, dispatch]}) {

    const onChange = ({target}) => {
        let name = target.name
        let value = target.value
        if (name === 'percentage' || 'fee'){
            value = parseFloat(target.value)
        }
        dispatch({
            type: target.name, payload: target.value
        })
    }

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
                               defaultValue={initState.percentage}/>
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <label htmlFor="fee">Fee</label>
                        <input type="number"
                               name="fee"
                               id="fee"
                               onChange={onChange}
                               defaultValue={initState.fee}/>
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
                           defaultValue={initState.buy}/>
                </div>
                <div className="col-6">
                    <label htmlFor="sell">Sell Currency</label>
                    <input type="text"
                           name="sell"
                           id="sell"
                           onChange={onChange}
                           defaultValue={initState.sell}/>
                </div>
            </div>

        </form>
    )
}

export default SettingsForm