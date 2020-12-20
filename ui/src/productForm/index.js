var product = {};
document.getElementById('submit-product').onclick = function() {
    var formproduct = [];
    formproduct = document.getElementsByClassName('product-value')
    var i = 0;
    for (i = 0; i < formproduct.length; i++) {
        if (formproduct[i]['name'] === "Image") {

        } else {
            product[formproduct[i]['name']] = formproduct[i].value
        }
    }
    console.log(product);
}

function submitProduct() {
    var formproduct = [];
    formproduct = document.getElementsByClassName('product-value')
    var i = 0;
    for (i = 0; i < formproduct.length; i++) {
        if (formproduct[i]['name'] === "Image") {

        } else {
            product[formproduct[i]['name']] = formproduct[i].value
        }
    }
    console.log(product);
}

function previewImage() {
    var file = document.querySelector('input[name="Image"]').files[0];
    var img = document.getElementById('product-image-preview')


    const reader = new FileReader();

    reader.addEventListener("load", function() {
        // convert image file to base64 string
        img.src = reader.result;
        product.Image = reader.result.replace('data:image/jpeg;base64,', '')

    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }


}