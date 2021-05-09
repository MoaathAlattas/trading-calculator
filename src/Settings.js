function SettingsForm({formInitState: initState, formState: [_, dispatch]}){

    const onChange = ({target}) => dispatch({
            type: target.name, payload: parseFloat(target.value)
        })

    return (
        <form>
            <label htmlFor="percentage">Profit Percentage</label>
            <input type="number"
                   name="profitPercentage"
                   onChange={onChange}
                   defaultValue={initState.profitPercentage}/>
        </form>
    )
}

export default SettingsForm