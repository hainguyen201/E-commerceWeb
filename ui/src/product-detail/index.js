var amountValue = document.getElementsByClassName('amount-value')[0]

function decreaseAmount() {
    var cur = parseInt(amountValue.value);

    if (cur > 1)
        amountValue.value = (cur - 1)
}

function increaseAmount(maxAmount) {
    var cur = parseInt(amountValue.value);

    if (cur < maxAmount)
        amountValue.value = (cur + 1)
}