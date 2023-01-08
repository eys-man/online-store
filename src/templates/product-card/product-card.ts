import Component from '../components';
import Data, { Product } from '../data';
import './product-card.css';

class ProductCard extends Component {
    private id: number; // id продукта
    item!: Product;
    constructor(tagName: string, className: string, id: number) {
        super(tagName, className);
        this.id = id;
        let i: number = 0;
        while (i < Data.products.length - 1) {
            if (id === Data.products[i].id) {
                this.item = Data.products[i];
                break;
            }
            i += 1;
        }
    }

    render() {
        // const productCard = document.createElement('div');
        // productCard.className = 'product-card';

        // левая часть
        const productGallery = document.createElement('div');
        productGallery.className = 'product-gallery';

        this.item.images.forEach((x, index) => {
            const productThumb = document.createElement('img');
            productThumb.className = 'product-thumb';
            productThumb.src = this.item.images[index];

            productGallery.append(productThumb);
        });
        this.container.append(productGallery);

        // средняя часть
        const img = document.createElement('img');
        img.className = 'product-img';
        img.src = this.item.images[0];
        this.container.append(img);

        // правая часть

        const info = document.createElement('div');
        info.className = 'product-info';

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.innerText = `id = ${this.id}, ${this.item.title}`;
        info.append(title);

        const description = document.createElement('p');
        description.className = 'product-description';
        let str: string = '';
        str += `<b>description: </b>`;
        str += `${this.item.description}<br>`;
        str += `<b>category: </b>`;
        str += `${this.item.category}<br>`;
        str += `<b>brand: </b>`;
        str += `${this.item.brand}<br>`;
        str += `<b>rating: </b>`;
        str += `${this.item.rating}<br>`;
        str += `<b>stock: </b>`;
        str += `${this.item.stock}<br>`;
        str += `<b>discount percentage: </b>`;
        str += `${this.item.discountPercentage}</br>`;
        description.innerHTML = str;
        info.append(description);

        const buttons = document.createElement('div');
        buttons.className = 'product-buttons';

        const add = document.createElement('button');
        add.className = 'add';
        add.innerHTML = 'Add to cart';

        const buy = document.createElement('button');
        buy.className = 'buy';
        buy.innerHTML = 'Buy now';
        buttons.append(add);
        buttons.append(buy);

        info.append(buttons);

        this.container.append(info);

        return this.container;
    }
}

export default ProductCard;
