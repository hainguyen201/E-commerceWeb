const routesMap = [];
let loadingElement = document.getElementById('loading-gif');
let app = document.querySelector('#app');
let container = document.querySelector('#main-container');
export class Router {
    /**
     * hàm thêm các element với container tương ứng vào routesmap
     * @param {đường dẫn từ bắt đầu từ root VD /product hoặc /product/1} prefix
     * @param {mảng HtmlElement} mdl
     * @param {container sẽ chứa element khi open route tương ứng} container
     */
    static addModule(prefix, mdl, container) {
        mdl.forEach((page) => {
            routesMap.push({
                route: `${prefix}${page.route}`,
                component: page,
                container: container,
            });
            //định nghĩa kiểu element custom cho thẻ div trong componentRegistry
            customElements.define(page.is, page, { extends: 'div' });
        });
        console.log(routesMap);
    }

    static addCustomModule(route, md, container) {
        routesMap.push({
            route: `${route}`,
            component: md,
            container: container,
        });
        //định nghĩa kiểu element custom cho thẻ div trong componentRegistry
        customElements.define(md.is, md, { extends: 'div' });
        console.log(routesMap);
    }

    /**
     * hàm lấy route và thay element trong container bằng element xác định bởi route
     * @param {*route Đường dẫn pathname /route}
     */
    static open(route) {
        const page = routesMap.find((r) =>
            new RegExp(`^${r.route}\$`).test(route),
        );
        if (!page) return this.onNotFound(route);
        document.dispatchEvent(this.pageLoading(page.component));
        //Khởi tạo 1 instance element mới với define đã có là { is: page.component.is }
        const newContent = document.createElement('div', {
            is: page.component.is,
        });
        newContent.params = this.getPageParams(page.route, route);
        let container = page.container;
        //xóa hết các element con trong container để thay element mới
        while (!!container.lastElementChild) {
            container.removeChild(container.lastElementChild);
        }
        container.appendChild(newContent);
        document.dispatchEvent(this.pageLoaded(page.component));
    }

    static pageLoaded(component) {
        return new CustomEvent('page-loaded', {
            detail: { component },
        });
    }

    static pageLoading(component) {
        return new CustomEvent('page-loading', {
            detail: { component },
        });
    }

    // static setContainer(el) {
    //   container = el;
    // }

    static onNotFound(route) {
        container.innerHTML = `Cannot find route ${route}`;
    }

    /**
     *
     * @param {*} pageRoute
     * @param {*} route
     */
    static getPageParams(pageRoute, route) {
        const regex = new RegExp(pageRoute);
        const matches = regex.exec(route);
        ['index', 'input', 'groups'].forEach((k) => delete matches[k]);
        matches.shift();
        return matches;
    }
}

window.addEventListener(
    'popstate',
    (event) => {
        //event fire when history.back(), forward(), go(); occur
        // thông báo cho router biết việc navigate được thực hiện
        Router.open(window.location.pathname);
    },
    false,
);

document.addEventListener(
    'page-loaded',
    (event) => {
        loadingElement.style.visibility = 'hidden';
        app.style.opacity = '1';
    },
    false,
);

document.addEventListener(
    'page-loading',
    (event) => {
        loadingElement.style.visibility = 'visible';
        loadingElement.style.display = 'grid !important';
        loadingElement.style.placeItems = 'center !important';
        app.style.opacity = '0.2';
    },
    false,
);

/**
 * classElement ghi đè event xảy ra với thẻ a custom có dạng <a is="router-link" href=""></a>
 */
class RouterLink extends HTMLAnchorElement {
    constructor() {
        super();
        this.addEventListener('click', (e) => {
            const route = this.getAttribute('href');
            console.log('route=>' + route);
            Router.open(route);
            window.history.pushState(
                {},
                route,
                `${window.location.origin}${route}`,
            );
            e.preventDefault();
        });
    }
}

customElements.define('router-link', RouterLink, { extends: 'a' });
