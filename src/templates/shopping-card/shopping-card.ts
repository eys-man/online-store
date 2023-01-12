import CartPage from '../../pages/cart';
import Component from '../components';
import Data, { Product, Item } from '../data';
import Header from '../header/header';
// import Header from '../header/header';
import './shopping-card.css';

class ShoppingCard extends Component {
    parent: CartPage;
    serialNumber: number;
    private id: number; // id продукта
    private quantity: number;
    item!: Product; // в массиве всех товаров
    cartItem!: Item; // элемент множества 'товары в корзине'
    constructor(tagName: string, className: string, x: Item, num: number, parent: CartPage) {
        super(tagName, className);
        this.parent = parent;
        this.serialNumber = num;
        this.id = x.id;
        this.quantity = x.quantity;
        let i: number = 0;
        while (i < Data.products.length - 1) {
            if (x.id === Data.products[i].id) {
                this.item = Data.products[i];
                this.cartItem = x;
                break; // нашли товар
            }
            i += 1;
        }
    }

    render() {
        const serialNumber = document.createElement('div');
        serialNumber.className = 'serial-number';
        serialNumber.innerText = `${this.serialNumber}`;
        this.container.append(serialNumber);

        const img = document.createElement('img');
        img.className = 'shopping-card-img';
        img.src = this.item.thumbnail;
        this.container.append(img);

        const info = document.createElement('div');
        info.className = 'shopping-card-info';

        const title = document.createElement('h3');
        title.className = 'shopping-card-title';
        title.innerText = `${this.item.title}`;
        info.append(title);

        const description = document.createElement('p');
        description.className = 'shopping-card-description';
        let str: string = '';
        str += `<b>description: </b>`;
        str += `${this.item.description}<br>`;
        str += `<b>category: </b>`;
        str += `${this.item.category}<br>`;
        str += `<b>brand: </b>`;
        str += `${this.item.brand}<br>`;
        str += `<b>rating: </b>`;
        str += `${this.item.rating}<br>`;
        str += `<b>discount percentage: </b>`;
        str += `${this.item.discountPercentage}</br>`;
        description.innerHTML = str;
        info.append(description);

        this.container.append(info);

        const controls = document.createElement('div');
        controls.className = 'shopping-card-controls';

        // кнопка уменьшить кол-во
        const decrease = document.createElement('button');
        decrease.className = 'decrease';
        decrease.innerText = '–';
        controls.append(decrease);

        //-------
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';

        const stock = document.createElement('p');
        stock.className = 'in-stock';
        stock.innerText = `in stock: ${this.item.stock}`;
        itemInfo.append(stock);

        const inCart = document.createElement('p');
        inCart.className = 'in-cart';
        inCart.innerText = `${this.quantity}`;
        itemInfo.append(inCart);

        const price = document.createElement('p'); // цена за несколько штук этого наименования
        price.className = 'items-price';
        price.innerText = `€${this.item.price * this.quantity}`;
        itemInfo.append(price);

        controls.append(itemInfo);

        // кнопка добавить кол-во
        const increase = document.createElement('button');
        increase.className = 'increase';
        increase.innerText = '+';
        controls.append(increase);

        this.container.append(controls);

        increase.addEventListener('click', () => {
            if (this.quantity < this.item.stock) {
                this.quantity += 1; // в классе
                this.cartItem.quantity += 1; // во множестве (по ссылке)

                inCart.innerText = `${this.quantity}`;
                price.innerText = `€${this.item.price * this.quantity}`;

                Header.update();

                // TODO: записать в localStorage
                const selectedItems: Item[] = Array.from(Data.selectedItems);
                localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            }
        });

        decrease.addEventListener('click', () => {
            if (this.quantity > 1) {
                this.quantity -= 1; // в классе
                this.cartItem.quantity -= 1; // во множестве (по ссылке)

                inCart.innerText = `${this.quantity}`;
                price.innerText = `€${this.item.price * this.quantity}`;

                Header.update();
            } else {
                // удалить из корзины элемент
                Data.selectedItems.delete(this.cartItem);
                Header.update();

                this.container.remove();
                this.parent.render();
            }
            // TODO: записать в localStorage
            const selectedItems: Item[] = Array.from(Data.selectedItems);
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        });
        return this.container;
    }
}

export default ShoppingCard;
