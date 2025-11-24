function placeOrder(callback) {
    setTimeout(() => {
        console.log("Order placed");
        callback();
    }, 1000);
}

function cookFood(callback) {
    setTimeout(() => {
        console.log("Food cooking");
        callback();
    }, 1000);
}

function deliverFood() {
    setTimeout(() => {
        console.log("Food delivered");
    }, 1000);
}

placeOrder(() => {
    cookFood(() => {
        deliverFood();
    });
});
