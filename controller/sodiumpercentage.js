// function calculate_sodiumpercentage(cations) {
//     let Na_per = 0;
//     Na_per= (cations[0]*100)/(cations[0]+cations[1]+cations[2]+cations[3]);
//     return Na_per;
//  }
 
//  module.exports = calculate_sodiumpercentage;

function calculate_sodiumpercentage(cations) {
    let [sodiumion, calciumion, magnesiumion, potassiumion] = cations;

    sodiumion = sodiumion || 0;
    calciumion = calciumion || 0;
    magnesiumion = magnesiumion || 0;
    potassiumion = potassiumion || 0;

    let totalCations = sodiumion + calciumion + magnesiumion + potassiumion;

    // Avoid division by zero
    if (totalCations === 0) {
        return 0;
    }

    let Na_per = (sodiumion * 100) / totalCations;
    return Na_per;
}

module.exports = calculate_sodiumpercentage;
