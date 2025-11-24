let marks = 85;
let age = 17;

// Grade
if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 70) {
    console.log("Grade B");
} else if (marks >= 50) {
    console.log("Grade C");
} else {
    console.log("Grade F");
}

// Ternary
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);
