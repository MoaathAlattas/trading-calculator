export function Currency({settings, type}){
    return <sup className="currency">{settings[type]}</sup>
}