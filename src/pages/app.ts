/* eslint-disable no-unused-vars */
import Page from '../templates/page';
import MainPage from './main';
import ProductPage from './product';
import CartPage from './cart';
import Header from '../templates/header/header';
import Footer from '../templates/footer/footer';
import ErrorPage, { ErrorTypes } from './error';
import Data from '../templates/data';

export const enum PageIds {
    MainPage = 'main-page',
    ProductPage = 'product-page',
    CartPage = 'cart-page',
}

class App {
    private static container = <HTMLElement>document.querySelector('.main');
    private header: Header;
    private footer: Footer;

    static renderNewPage(idPage: string) {
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.ProductPage) {
            page = new ProductPage(idPage);
        } else if (idPage === PageIds.CartPage) {
            page = new CartPage(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            App.container.innerHTML = '';
            const pageHTML = page.render();
            App.container.append(pageHTML);
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            console.log('hash=' + hash);
            App.renderNewPage(hash);
        });
    }

    constructor() {
        this.header = new Header('header', 'header');
        this.footer = new Footer('footer', 'footer');
    }

    async run() {
        const a = new Data('https://dummyjson.com/products?limit=50');
        await a.getData();
        // Data.makeFilteredArray();
        // Data.sort();

        document.body.prepend(this.header.render());
        App.renderNewPage('main-page');
        document.body.append(this.footer.render());
        this.enableRouteChange();
    }
}

export default App;
