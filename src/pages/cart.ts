import Page from '../templates/page';

class CartPage extends Page {
    static TextObject = {
        MainTitle: 'Shopping Cart',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const p = document.createElement('p');
        p.innerText = CartPage.TextObject.MainTitle;
        this.container.append(p);
        return this.container;
    }
}

export default CartPage;
