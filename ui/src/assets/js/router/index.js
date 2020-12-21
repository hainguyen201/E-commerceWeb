import { Router } from './Router.js';
// import containerProductElement from '../module/product/containerElement.js';
import containerRootElement from '../module/root/index.js';
import productList from '../module/product/index.js';
import catalogList from '../module/catalog/index.js';
import cartList from '../module/cart/index.js';
import userList from '../module/user/index.js';
import transactionList from '../module/transaction/index.js';
import CatalogAdElement from '../module/admin/catalogAdElement.js';
import ProductAdElement from '../module/admin/productAdElement.js';
import TransactionAdElement from '../module/admin/transactionAdElement.js';
import SearchElement from '../module/search/searchElement.js';

const mainContainer = document.querySelector('#main-container');
Router.addModule('/products', productList, mainContainer);
Router.addModule('/catalogs', catalogList, mainContainer);
Router.addModule('/users', userList, mainContainer);
Router.addModule('/', containerRootElement, mainContainer);
Router.addModule('/cart', cartList, mainContainer);
Router.addModule('/transactions', transactionList, mainContainer);
Router.addModule('/search', SearchElement, mainContainer);

//Auth trước khi mở đường dẫn mới
// console.log('reload resource');
// userService
//     .authService()
//     .then((data) => {
//         let user = data[0];
//         if (user) {
//             loginSuccessful(user);
//             if (user.Role == 1) {
//                 Router.addModule(
//                     '/admin/catalog',
//                     CatalogAdElement,
//                     mainContainer
//                 );
//                 Router.addModule(
//                     '/admin/product',
//                     ProductAdElement,
//                     mainContainer
//                 );
//                 Router.addModule(
//                     '/admin/transaction',
//                     TransactionAdElement,
//                     mainContainer
//                 );
//             }
//         } else {
//             notifSuccess('Bạn chưa đăng nhập tài khoản');
//         }
//         updateShowTotalProductOfCart();
//         Router.open(window.location.pathname);
//     })
//     .catch((err) => {
//         notifFailure(err.toString());
//     });

//notifSuccess("test");