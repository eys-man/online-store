import Component from '../components';
import Data from '../data';
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

        this.img.src = '../../img/cart.png';
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

        return this.container;
    }
}

export default Header;
