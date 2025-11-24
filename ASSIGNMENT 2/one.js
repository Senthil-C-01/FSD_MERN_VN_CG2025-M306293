let num = 15;

if (num % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

if (num > 0) {
    console.log("Positive");
} else if (num < 0) {
    console.log("Negative");
} else {
    console.log("Zero");
}

if (num % 3 === 0 && num % 5 === 0) {
    console.log("Divisible by both 3 and 5");
} else {
    console.log("Not divisible by both 3 and 5");
}
