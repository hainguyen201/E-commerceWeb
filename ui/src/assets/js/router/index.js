import { Router } from "./Router.js";
// import containerProductElement from '../module/product/containerElement.js';
import containerRootElement from '../module/root/index.js';
import productList from '../module/product/index.js';
import catalogList from '../module/catalog/index.js';

const mainContainer = document.querySelector("#main-container");
Router.addModule("/products", productList, mainContainer);
Router.addModule("/catalogs", catalogList, mainContainer);
Router.addModule("/", containerRootElement, mainContainer);

Router.open(window.location.pathname);
//notifSuccess("test");