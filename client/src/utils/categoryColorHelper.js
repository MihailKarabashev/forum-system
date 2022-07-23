export function generateRandomInteger(min, max) {
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return number % 1 === 0 ? addLeadingZeros(number, 2) : number;
}

function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}