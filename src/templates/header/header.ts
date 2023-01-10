import Component from '../components';
import Data, { Item } from '../data';
import './header.css';

class Header extends Component {
    linkShop = document.createElement('a');
    h1 = document.createElement('h1');

    total = document.createElement('p');

    linkCart = document.createElement('a');

    img = document.createElement('img');
    p = document.createElement('p');

    h2 = document.createElement('h2');

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.linkShop.className = 'link-header';
        this.linkShop.href = '#main-page';
        this.h1.className = 'h1';
        this.h1.innerHTML = 'Online Store';

        this.linkCart.className = 'link-header';
        this.linkCart.href = '#cart-page';

        // this.img.src = '../../img/cart.png';
        this.img.src = './img/cart.png';
        this.img.className = 'cart';
        this.p.className = 'quantity';
        // this.h2.className = 'h2';
        // this.h2.innerHTML = 'Shopping Cart';

        this.total.className = 'total';
        this.total.innerHTML = `Total = €0`;

        // this.total.className = 'total';
        // this.total.innerHTML = `Total = €${sum}`;
        // Header.update();
    }

    static async update() {
        await Data.updateCost();
        const total = document.querySelector('.total') as HTMLElement;
        // alert(total);
        total.innerHTML = `Total = €${Data.totalCost}`; // сумма товаров

        const quantity = document.querySelector('.quantity') as HTMLParagraphElement;
        quantity.innerHTML = `${Data.totalItems}`; // число товаров в корзине
    }

    render() {
        this.linkShop.append(this.h1);

        this.linkCart.append(this.img);
        this.linkCart.append(this.p);

        this.container.append(this.linkShop);

        this.container.append(this.total);

        this.container.append(this.linkCart);

        // перейти в корзину
        this.linkCart.addEventListener('click', (event) => {
            event.preventDefault();
            // alert('в корзину не переходим');

            const url = new URL(window.location.href);
            window.history.pushState(null, '', url);

            // TODO: сформировать searchParams для корзины
            const selectedItems: Array<Item> = Array.from(Data.selectedItems);
            // url.search = `selectedItems=${JSON.stringify(selectedItems)}`;
            url.search = '';
            url.searchParams.set('selectedItems', JSON.stringify(selectedItems));

            window.history.replaceState(null, '', url);
            window.location.hash = 'cart-page';
        });

        // прейти в магазин
        this.linkShop.addEventListener('click', (event) => {
            event.preventDefault();
            // alert('в магазин не переходим');

            const url = new URL(window.location.href);
            window.history.pushState(null, '', url);

            // TODO: сформировать searchParams для магазина
            // url.searchParams.set('id', `${this.item.id}`);
            url.search = '';
            window.history.replaceState(null, '', url);
            window.location.hash = 'main-page';
        });

        return this.container;
    }
}

export default Header;
