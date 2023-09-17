const powerCost = ({watt, cost, time}) => {
    let kWh = watt / 1000;

    let dailyKwh = kWh * time;
    let monthlyKwh = dailyKwh * 30;

    let dailyCost = kWh * cost * time;
    let monthlyCost = dailyCost * 30;

    console.log(time);

    return {
        dailyKwh,
        monthlyKwh,
        dailyCost,
        monthlyCost
    }
}

export default powerCost;