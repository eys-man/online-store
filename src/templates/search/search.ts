import MainPage from '../../pages/main';
import Brand from '../brand/brand';
import Category from '../category/category';
import Component from '../components';
import Data from '../data';
import Slider from '../slider/slider';
import './search.css';

class Search extends Component {
    reset: HTMLButtonElement;
    search: HTMLInputElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.reset = document.createElement('button');
        this.reset.className = 'button';
        this.reset.innerText = '🞪';

        this.search = document.createElement('input');
        this.search.type = 'text';
    }

    static async reset() {
        const search = document.querySelector('.search') as HTMLDivElement;
        (search.querySelector('input') as HTMLInputElement).value = '';
    }

    render() {
        this.container.append(this.search);
        this.container.append(this.reset);

        this.search.addEventListener('change', () => {
            // ---- это на событие 'input' ------
            // alert('введено ' + this.search.value);
            // for (let i: number = 0; i < Data.filteredProducts.length; i += 1) {
            //     let x = Data.filteredProducts[i];
            //     if (
            //         x.title.indexOf(this.search.value) === -1 &&
            //         x.description.indexOf(this.search.value) === -1 &&
            //         x.brand.indexOf(this.search.value) === -1 &&
            //         x.category.indexOf(this.search.value) === -1
            //     ) {
            //         // не нашел - удалить из массива
            //         // alert('удаляем из массива');
            //         Data.filteredProducts.splice(i, 1);
            //         i -= 1;
            //     }
            // }
            Data.search = this.search.value;
            Data.makeFilteredArray();
            Data.sort();
            MainPage.gallery.render();

            // обновить фильтры
            let category = document.querySelector('.category') as HTMLElement;
            const categoryFilter = new Category('div', 'category', 'category');
            category.replaceWith(categoryFilter.render());

            let brand = document.querySelector('.brand') as HTMLElement;
            const brandFilter = new Brand('div', 'brand', 'brand');
            brand.replaceWith(brandFilter.render());

            let price = document.querySelector('.price') as HTMLElement;
            const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
            price.replaceWith(priceFilter.render());

            let stock = document.querySelector('.stock') as HTMLElement;
            const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
            stock.replaceWith(stockFilter.render());

            const found = document.body.querySelector('.found') as HTMLElement;
            found.innerHTML = `Found: ${Data.filteredProducts.length}`;
        });

        this.reset.addEventListener('click', () => {
            //alert('сброс поиска');
            this.search.value = '';
            Data.search = '';

            Data.makeFilteredArray();
            Data.sort();
            MainPage.gallery.render();

            let category = document.querySelector('.category') as HTMLElement;
            const categoryFilter = new Category('div', 'category', 'category');
            category.replaceWith(categoryFilter.render());

            let brand = document.querySelector('.brand') as HTMLElement;
            const brandFilter = new Brand('div', 'brand', 'brand');
            brand.replaceWith(brandFilter.render());

            let price = document.querySelector('.price') as HTMLElement;
            const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
            price.replaceWith(priceFilter.render());

            let stock = document.querySelector('.stock') as HTMLElement;
            const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
            stock.replaceWith(stockFilter.render());

            const found = document.body.querySelector('.found') as HTMLElement;
            found.innerHTML = `Found: ${Data.filteredProducts.length}`;
        });

        return this.container;
    }
}

export default Search;
