import { Router } from "./Router.js";
import ProductElement from '../module/product/containerElement.js';
import RootElement from '../module/root/index.js';

const modules = [ProductElement];
const modules1 = [RootElement];

Router.addModule("/product", modules);
Router.addModule("/", modules1);
const div = document.querySelector("#main-container");
Router.setContainer(div);
Router.open(window.location.pathname);
