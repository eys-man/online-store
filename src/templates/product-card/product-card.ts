import Component from '../components';
import Data, { Item, Product } from '../data';
import Header from '../header/header';
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
        // ------------- хлебные крошки -----------
        const breadcrumbs = document.createElement('ul');
        breadcrumbs.className = 'breadcrumbs';

        const ulItems = [`main-page`, `${this.item.category}`, `${this.item.brand}`, `${this.item.title}`];
        ulItems.forEach((x, index) => {
            const a = document.createElement('a');
            if (index < ulItems.length - 1) {
                const url = new URL(window.location.href);
                url.search = '';
                url.hash = 'main-page';

                a.href = url.href;
                // a.href = Data.pageURL.href;
            } else a.href = window.location.href;

            const li = document.createElement('li');
            li.innerText = ulItems[index];
            a.append(li);

            a.addEventListener('click', (event) => {
                if (a.href === window.location.href) return;

                event.preventDefault();
                const url = new URL(window.location.href);
                window.history.pushState(null, '', url);

                // TODO: сформировать searchParams для магазина
                // url.searchParams.set('id', `${this.item.id}`);
                url.search = '';
                window.history.replaceState(null, '', url);
                window.location.hash = 'main-page';
            });

            breadcrumbs.append(a);
        });

        this.container.append(breadcrumbs);

        const productCardContainer = document.createElement('div');
        productCardContainer.className = 'product-card-container';

        // ---------------- карточка товара ---------------------
        // левая часть
        const productGallery = document.createElement('div');
        productGallery.className = 'product-gallery';

        this.item.images.forEach((x, index) => {
            const productThumb = document.createElement('img');
            productThumb.className = 'product-thumb';
            productThumb.src = this.item.images[index];

            productGallery.append(productThumb);
        });
        productCardContainer.append(productGallery);

        // средняя часть
        const img = document.createElement('img');
        img.className = 'product-img';
        img.src = this.item.images[0];
        productCardContainer.append(img);

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

        const price = document.createElement('p');
        price.className = 'product-price';
        price.innerHTML = `€${this.item.price}</br>`;
        info.append(price);

        // кнопки
        const buttons = document.createElement('div');
        buttons.className = 'product-buttons';

        const add = document.createElement('button');
        add.className = 'add';
        add.textContent = 'Add to cart';
        Data.selectedItems.forEach((x) => {
            if (this.id === x.id) add.textContent = 'Remove from cart';
        });

        const buy = document.createElement('button');
        buy.className = 'buy';
        buy.textContent = 'Buy now';
        buttons.append(add);
        buttons.append(buy);

        info.append(buttons);

        productCardContainer.append(info);

        this.container.append(productCardContainer);

        productGallery.addEventListener('click', (event) => {
            if (event.target !== null && (event.target as HTMLImageElement).className === 'product-thumb') {
                img.src = (event.target as HTMLImageElement).src;
            }
        });

        add.addEventListener('click', async () => {
            if (add.textContent === 'Add to cart') {
                Data.selectedItems.add({ id: this.id, quantity: 1 });
                add.textContent = 'Remove from cart';
                Header.update();
            } else {
                Data.selectedItems.forEach((x) => {
                    if (x.id === this.id) Data.selectedItems.delete(x);
                });
                add.textContent = 'Add to cart';
                Header.update();
            }

            // обновить данные в localStorage
            await Data.saveData();
        });

        buy.addEventListener('click', () => {
            // alert('в корзину');
            const url = new URL(window.location.href);
            window.history.pushState(null, '', url);

            // TODO: сгенерить URL для корзины
            const selectedItems: Array<Item> = Array.from(Data.selectedItems);
            // url.search = `selectedItems=${JSON.stringify(selectedItems)}`;
            url.search = '';
            url.searchParams.set('selectedItems', JSON.stringify(selectedItems));

            window.history.replaceState(null, '', url);
            window.location.hash = 'cart-page';
        });

        return this.container;
    }
}

export default ProductCard;
