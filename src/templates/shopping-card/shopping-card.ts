import Component from '../components';
import Data, { Product } from '../data';
// import Header from '../header/header';
import './shopping-card.css';

class ShoppingCard extends Component {
    private id: number; // id продукта
    item!: Product;
    constructor(tagName: string, className: string, id: number) {
        super(tagName, className);
        this.id = id;
        let i: number = 0;
        while (i < Data.products.length - 1) {
            if (id === Data.products[i].id) {
                this.item = Data.products[i];
                break; // нашли товар
            }
            i += 1;
        }
    }

    render() {
        // ---------------- карточка товара ---------------------
        // this.container.className = 'shopping-card';

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

        this.container.append(controls);

        return this.container;
    }
}

export default ShoppingCard;
