import Component from '../components';
import CheckBoxLine from '../checkbox/checkbox';
import Data from '../data';
import './brand.css';
import MainPage from '../../pages/main';
import Slider from '../slider/slider';
import Category from '../category/category';

class Brand extends Component {
    private id: string;
    constructor(tagName: string, className: string, id: string) {
        super(tagName, className);
        this.id = id;
    }

    render() {
        // alert('render Brand');
        this.container.innerHTML = '';
        const p = document.createElement('p');
        p.innerText = this.id;
        p.className = 'p';
        this.container.append(p);

        const filterList = document.createElement('div');
        filterList.className = 'filter-list';

        // alert('число брэндов = ' + Data.brand.size);
        Data.brand.forEach((item) => {
            const check = new CheckBoxLine(
                'div',
                'checkbox-line',
                item,
                false,
                Data.getQuantityBrand(item),
                Data.getQuantityBrandFiltered(item)
            );
            if (Data.selectedBrand.has(item)) check.checked = true;
            filterList.append(check.render());
        });

        this.container.append(filterList);

        this.container.addEventListener('click', (event) => {
            const target = event?.target;
            if (target instanceof HTMLInputElement) {
                if (target.checked === true) {
                    Data.selectedBrand.add(target.id);
                } else {
                    Data.selectedBrand.delete(target.id);
                }

                // TODO: всё это засунуть в функцию (updateOtherFilters - типа такого названия)
                Data.makeFilteredArray();
                Data.sort();
                MainPage.gallery.render();

                // TODO: пересчитать диапазоны для слайдеров

                // изменить фильтры brand и слайдеры
                let category = document.querySelector('.category') as HTMLElement;
                const categoryFilter = new Category('div', 'category', 'category');
                category.replaceWith(categoryFilter.render());

                let price = document.querySelector('.price') as HTMLElement;
                const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
                price.replaceWith(priceFilter.render());

                let stock = document.querySelector('.stock') as HTMLElement;
                const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
                stock.replaceWith(stockFilter.render());
            } else if (target instanceof HTMLDivElement) {
                let input = target.querySelector('input') as HTMLInputElement;
                if (input.checked === true) {
                    input.checked = false;

                    Data.selectedBrand.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedBrand.add(input.id);
                }

                // TODO: всё это засунуть в функцию (updateOtherFilters - типа такого названия)
                Data.makeFilteredArray();
                Data.sort();
                MainPage.gallery.render();

                // TODO: пересчитать диапазоны для слайдеров

                // изменить фильтры brand и слайдеры
                let category = document.querySelector('.category') as HTMLElement;
                const categoryFilter = new Category('div', 'category', 'category');
                category.replaceWith(categoryFilter.render());

                let price = document.querySelector('.price') as HTMLElement;
                const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
                price.replaceWith(priceFilter.render());

                let stock = document.querySelector('.stock') as HTMLElement;
                const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
                stock.replaceWith(stockFilter.render());
            } else if (target instanceof HTMLSpanElement || target instanceof HTMLLabelElement) {
                let parent = target.parentElement as HTMLDivElement;
                let input = parent.querySelector('input') as HTMLInputElement;

                if (input.checked === true) {
                    input.checked = false;

                    Data.selectedBrand.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedBrand.add(input.id);
                }

                // TODO: всё это засунуть в функцию (updateOtherFilters - типа такого названия)
                Data.makeFilteredArray();
                Data.sort();
                MainPage.gallery.render();

                // TODO: пересчитать диапазоны для слайдеров

                // изменить фильтры brand и слайдеры
                let category = document.querySelector('.category') as HTMLElement;
                const categoryFilter = new Category('div', 'category', 'category');
                category.replaceWith(categoryFilter.render());

                let price = document.querySelector('.price') as HTMLElement;
                const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
                price.replaceWith(priceFilter.render());

                let stock = document.querySelector('.stock') as HTMLElement;
                const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
                stock.replaceWith(stockFilter.render());
            }
            // TODO: это тоже засунуть в функцию (updateOtherFilters - типа такого названия)
            const found = document.querySelector('.found') as HTMLElement;
            found.innerHTML = `Found: ${Data.filteredProducts.length}`;
        });

        return this.container;
    }
}

export default Brand;
