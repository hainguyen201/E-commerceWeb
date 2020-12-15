import { Router } from "./Router.js";
import containerProductElement from '../module/product/containerElement.js';
import containerRootElement from '../module/root/index.js';

const mainContainer = document.querySelector("#main-container");
Router.addModule("/product", containerProductElement, mainContainer);
Router.addModule("/", containerRootElement, mainContainer);
Router.open(window.location.pathname);
