import Data from '../templates/data';
import Page from '../templates/page';

class CartPage extends Page {
    static TextObject = {
        MainTitle: 'Shopping Cart',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        Data.selectedItems.forEach((x) => {
            const p = document.createElement('p');
            p.innerText = `id = ${x.id}, quantity = ${x.quantity}`;
            this.container.append(p);
        });

        return this.container;
    }
}

export default CartPage;
