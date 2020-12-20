var amountValue = document.getElementsByClassName('amount-value')[0];

function decreaseAmount() {
    var cur = parseInt(amountValue.value);

    if (cur > 1) amountValue.value = cur - 1;
}

function increaseAmount(maxAmount) {
    var cur = parseInt(amountValue.value);

    if (cur < maxAmount) amountValue.value = cur + 1;
}
document.getElementsByClassName('btn-addorder')[0].onclick = function() {
    console.log('ok')
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(xhr.responseText)
    }
    xhr.open('DELETE', "https://127.0.0.1:3000/productorders/1/1")
    xhr.withCredentials = true
    xhr.send();
}