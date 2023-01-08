import Component from '../components';
import Data, { Product } from '../data';
import Header from '../header/header';

class Card extends Component {
    // private id: string; // название категории/брэнда, он же - id элемента
    item: Product;
    constructor(tagName: string, className: string, item: Product) {
        super(tagName, className);
        this.item = item;
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';

        const title = document.createElement('p');
        title.className = 'title';
        title.innerText = `id: ${this.item.id} --- ${this.item.title}`;
        wrapper.append(title);

        const img = document.createElement('img');
        img.src = this.item.thumbnail;
        wrapper.append(img);

        this.container.append(wrapper);

        const info = document.createElement('div');
        info.className = 'info';
        let str: string = '';
        str += `<p>Category: ${this.item.category}</p>`;
        str += `<p>Brand: ${this.item.brand}</p>`;
        str += `<p>Price: €${this.item.price}</p>`;
        str += `<p>Discount: ${this.item.discountPercentage}%</p>`;
        str += `<p>Rating: ${this.item.rating}</p>`;
        str += `<p>Stock: ${this.item.stock}</p>`;

        info.innerHTML = str;
        this.container.append(info);

        const button = document.createElement('button');
        button.className = 'card-buttons';
        button.textContent = 'Add to cart';
        // this.item.id проверить, есть ли во множестве отобранных
        Data.selectedItems.forEach((x) => {
            if (x.id === this.item.id) button.textContent = 'Remove from cart';
        });

        this.container.append(button);

        if (Data.viewMode === 'tiles') {
            this.container.classList.remove('linear');
            this.container.classList.add('tiles');
        } else if (Data.viewMode === 'linear') {
            this.container.classList.remove('tiles');
            this.container.classList.add('linear');
        }

        this.container.addEventListener('click', ({ target }) => {
            if (target === button) {
                if (button.textContent === 'Add to cart') {
                    Data.selectedItems.add({ id: this.item.id, quantity: 1 });
                    button.textContent = 'Remove from cart';
                    Header.update();
                } else {
                    Data.selectedItems.forEach((x) => {
                        if (x.id === this.item.id) Data.selectedItems.delete(x);
                    });
                    button.textContent = 'Add to cart';
                    Header.update();
                }
            } else {
                // alert('надо открывать карту товара');
                const url = new URL(window.location.href);
                //window.history.pushState(null, '', url);

                url.searchParams.set('id', `${this.item.id}`);
                window.history.replaceState(null, '', url);
                window.location.hash = 'product-page';
            }
        });

        return this.container;
    }
}

export default Card;
