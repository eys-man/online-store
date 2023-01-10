import Data from '../templates/data';
import Page from '../templates/page';
import ShoppingCard from '../templates/shopping-card/shopping-card';

class CartPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        // this.container.className = 'cart';
        const cart = document.createElement('div');
        cart.className = 'shopping-cart';

        const cardList = document.createElement('div');
        cardList.className = 'card-list';
        cart.append(cardList);

        const cardListHeader = document.createElement('div');
        cardListHeader.className = 'card-list-header';
        cardList.append(cardListHeader);

        Data.selectedItems.forEach((x) => {
            const card = new ShoppingCard('div', 'shopping-card', x.id);

            cardList.append(card.render());
        });
        cart.append(cardList);

        const summary = document.createElement('div');
        summary.className = 'summary';
        cart.append(summary);

        this.container.append(cart);

        return this.container;
    }
}

export default CartPage;
