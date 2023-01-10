import Data from '../templates/data';
import Page from '../templates/page';
import ShoppingCard from '../templates/shopping-card/shopping-card';

class CartPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        this.container.className = 'shopping-card';

        const listTitle = document.createElement('div');
        listTitle.className = 'list-header';

        Data.selectedItems.forEach((x) => {
            const card = new ShoppingCard('div', 'cart', x.id);

            this.container.append(card.render());
        });

        return this.container;
    }
}

export default CartPage;
