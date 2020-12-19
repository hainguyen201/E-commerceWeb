import { Router } from "./Router.js";
// import containerProductElement from '../module/product/containerElement.js';
import containerRootElement from '../module/root/index.js';
import productList from '../module/product/index.js';
import catalogList from '../module/catalog/index.js';

const mainContainer = document.querySelector("#main-container");
Router.addModule("/products", productList, mainContainer);
Router.addModule("/catalogs", catalogList, mainContainer);
Router.addModule("/", containerRootElement, mainContainer);

//Auth trước khi mở đường dẫn mới
console.log("reload resource");
userService.authService().then((data) => {
    if (data[0]) {
        loginSuccessful(data[0]);
    }
    else {
        notifSuccess("Bạn chưa đăng nhập tài khoản");
    }
    Router.open(window.location.pathname);
}).catch((err) => {
    notifFailure(err.toString());
});

//notifSuccess("test");