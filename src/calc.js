function total(acc, curr) {
    return acc + curr
}

export function withTotalValue(order) {
    return ({...order, value: order.buy * order.quantity})
}

export function withOrdersCalc(acc, curr, i) {
    const total_orders_value = (i > 0) ? acc.map(order => order.value).reduce(total, 0) + curr.value : curr.value;
    const total_orders_quantity = (i > 0) ? acc.map(order => order.quantity).reduce(total) + curr.quantity : curr.quantity;
    const estimated_profit = total_orders_value * 0.02;
    const value_after_sell = (total_orders_value * 0.02) + total_orders_value;
    const sell_price = value_after_sell / total_orders_quantity

    let calc = {
        prev: acc,
        total_orders_value,
        total_orders_quantity,
        value_after_sell,
        estimated_profit,
        sell_price
    }
    return [...acc, {...curr, ...calc}]
}

export function getEndingCalc(orders) {

    const total_orders_value = orders.map(order => order.value).reduce(total, 0);
    const total_orders_quantity = orders.map(order => order.quantity).reduce(total);
    const estimated_profit = total_orders_value * 0.02;
    const value_after_sell = (total_orders_value * 0.02) + total_orders_value;
    const sell_price = estimated_profit / total_orders_quantity;

    return {
        total_orders_value,
        total_orders_quantity,
        value_after_sell,
        estimated_profit,
        sell_price
    }
}

export function objToFixed(obj){
    const entries = Object.entries(obj).map(([k,v])=>{
        const isNumber = typeof v === 'number'
        if(isNumber){
            // return [k, v]
            return [k, Math.ceil(v * 1000)/1000]
        }
        return [k, v]
    })
    return Object.fromEntries(entries)
}

export function arrToFixed(arr){
    return arr.map(obj=>objToFixed(obj))
}