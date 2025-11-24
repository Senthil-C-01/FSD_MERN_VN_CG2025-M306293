let expenses = [2000, 1500, 3500, 4000];

function totalExpenses(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    console.log("Total spent:", total);
}

totalExpenses(expenses);
