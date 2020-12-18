import { Router } from "./Router.js";
// import containerProductElement from '../module/product/containerElement.js';
import containerRootElement from '../module/root/index.js';
import productList from '../module/product/index.js';

const mainContainer = document.querySelector("#main-container");
Router.addModule("/product", productList, mainContainer);
Router.addModule("/", containerRootElement, mainContainer);
Router.open(window.location.pathname);
//notifSuccess("test");