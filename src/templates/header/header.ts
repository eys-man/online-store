import Component from '../components';
import './header.css';

class Header extends Component {
    linkShop = document.createElement('a');
    h1 = document.createElement('h1');

    linkCart = document.createElement('a');
    h2 = document.createElement('h2');

    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.linkShop.className = 'link-header';
        this.linkShop.href = '#main-page';
        this.h1.className = 'h1';
        this.h1.innerHTML = 'Online Store';

        this.linkCart.className = 'link-header';
        this.linkCart.href = '#cart-page';
        this.h2.className = 'h2';
        this.h2.innerHTML = 'Shopping Cart';
    }

    render() {
        this.linkShop.append(this.h1);

        this.linkCart.append(this.h2);

        this.container.append(this.linkShop);
        this.container.append(this.linkCart);

        return this.container;
    }
}

export default Header;
