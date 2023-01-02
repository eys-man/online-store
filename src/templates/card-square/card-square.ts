import Component from '../components';
import { Product } from '../data';

class CardSquare extends Component {
    // private id: string; // название категории/брэнда, он же - id элемента
    item: Product;
    constructor(tagName: string, className: string, item: Product) {
        super(tagName, className);
        this.item = item;
    }

    render() {
        const title = document.createElement('p');
        title.className = 'title';
        title.innerText = `id: ${this.item.id} --- ${this.item.title}`;
        this.container.append(title);

        const img = document.createElement('img');
        img.src = this.item.thumbnail;
        // img.style.width = '120px';
        // img.style.height = '120px';
        this.container.append(img);

        const info = document.createElement('div');
        info.className = 'info';
        let str: string = '';
        str += `<p>Category: ${this.item.category}</p>`;
        str += `<p>Brand: ${this.item.brand}</p>`;
        str += `<p>Price: ${this.item.price}</p>`;
        str += `<p>Discount: ${this.item.discountPercentage}</p>`;
        str += `<p>Rating: ${this.item.rating}</p>`;
        str += `<p>Stock: ${this.item.stock}</p>`;

        info.innerHTML = str;
        this.container.append(info);

        const buttons = document.createElement('button');
        buttons.className = 'card-buttons';
        buttons.innerText = 'Add to cart';

        this.container.append(buttons);
        return this.container;
    }
}

export default CardSquare;
