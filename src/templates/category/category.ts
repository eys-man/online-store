import Component from '../components';
import CheckBoxLine from '../checkbox/checkbox';
import Data from '../data';
import './category.css';
import MainPage from '../../pages/main';
import Brand from '../brand/brand';
import Slider from '../slider/slider';

class Category extends Component {
    private id: string;
    constructor(tagName: string, className: string, id: string) {
        super(tagName, className);
        this.id = id;
    }

    render() {
        this.container.innerHTML = '';
        const p = document.createElement('p');
        p.className = 'p';
        p.innerText = this.id;
        this.container.append(p);

        const filterList = document.createElement('div');
        filterList.className = 'filter-list';

        // alert('число категорий = ' + Data.category.size);
        Data.category.forEach((item) => {
            const check = new CheckBoxLine(
                'div',
                'checkbox-line',
                item,
                false,
                Data.getQuantityCat(item),
                Data.getQuantityCatFiltered(item)
            );
            if (Data.selectedCategory.has(item)) check.checked = true;
            filterList.append(check.render());
        });

        this.container.append(filterList);

        this.container.addEventListener('click', (event) => {
            const target = event?.target;
            // const aside = document.querySelector('.filters') as HTMLElement;
            if (target instanceof HTMLInputElement) {
                if (target.checked === true) {
                    Data.selectedCategory.add(target.id);
                } else {
                    Data.selectedCategory.delete(target.id);
                }

                // TODO: всё это засунуть в функцию (updateOtherFilters - типа такого названия)
                Data.makeFilteredArray();
                Data.sort();
                MainPage.gallery.render();

                // TODO: пересчитать диапазоны для слайдеров

                // изменить фильтры brand и слайдеры
                let brand = document.querySelector('.brand') as HTMLElement;
                const brandFilter = new Brand('div', 'brand', 'brand');
                brand.replaceWith(brandFilter.render());

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

                    Data.selectedCategory.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedCategory.add(input.id);
                }

                // TODO: всё это засунуть в функцию (updateOtherFilters - типа такого названия)
                Data.makeFilteredArray();
                Data.sort();
                MainPage.gallery.render();

                // изменить фильтры brand и слайдеры
                let brand = document.querySelector('.brand') as HTMLElement;
                const brandFilter = new Brand('div', 'brand', 'brand');
                brand.replaceWith(brandFilter.render());

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

                    Data.selectedCategory.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedCategory.add(input.id);
                }

                // TODO: всё это засунуть в функцию (updateOtherFilters - типа такого названия)
                Data.makeFilteredArray();
                Data.sort();
                MainPage.gallery.render();

                // TODO: пересчитать диапазоны для слайдеров

                // изменить фильтры brand и слайдеры
                let brand = document.querySelector('.brand') as HTMLElement;
                const brandFilter = new Brand('div', 'brand', 'brand');
                brand.replaceWith(brandFilter.render());

                let price = document.querySelector('.price') as HTMLElement;
                const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
                price.replaceWith(priceFilter.render());

                let stock = document.querySelector('.stock') as HTMLElement;
                const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
                stock.replaceWith(stockFilter.render());
            }
            // TODO: это тоже засунуть в функцию (updateOtherFilters - типа такого названия)
            const found = document.body.querySelector('.found') as HTMLElement;
            found.innerHTML = `Found: ${Data.filteredProducts.length}`;
        });

        return this.container;
    }
}

export default Category;
