function getBase(system) {
    switch(system) {
        case 'binary': return 2;
        case 'octal': return 8;
        case 'decimal': return 10;
        case 'hexadecimal': return 16;
        default: return 10;
    }
}
function isValidForBase(input, base) {
    const regexMap = {
        2: /^[0-1]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9A-Fa-f]+$/
    };
    return regexMap[base].test(input);
}
function convertNumber(input, fromBase, toBase) {
    try {
        const decimalValue = parseInt(input, fromBase);
        if (isNaN(decimalValue)) throw new Error("Invalid input for base " + fromBase);
        return decimalValue.toString(toBase).toUpperCase();
    } catch (e) {
        return "Error: " + e.message;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('converter-form');
    const inputNumber = document.getElementById('inputNumber');
    const fromSystem = document.getElementById('fromSystem');
    const toSystem = document.getElementById('toSystem');
    const resultDiv = document.getElementById('result');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = inputNumber.value.trim();
        const fromBase = getBase(fromSystem.value);
        const toBase = getBase(toSystem.value);
        if (!isValidForBase(input, fromBase)) {
            resultDiv.textContent = `❌ Invalid number for ${fromSystem.value}`;
            return;
        }
        const decimalValue = parseInt(input, fromBase);
        if (isNaN(decimalValue) || decimalValue < 1 || decimalValue > 100) {
            resultDiv.textContent = '❌ Please enter a number between 1 and 100.';
            return;
        }
        const converted = convertNumber(input, fromBase, toBase);
        resultDiv.textContent = `Result: ${converted}`;
    });
});
