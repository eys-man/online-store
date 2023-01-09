import Component from '../components';
import CheckBoxLine from '../checkbox/checkbox';
import Data from '../data';
import './category.css';
import MainPage from '../../pages/main';
import Brand from '../brand/brand';
import Slider from '../slider/slider';
import Header from '../header/header';

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

        this.container.addEventListener('click', async (event) => {
            const target = event?.target;
            // const aside = document.querySelector('.filters') as HTMLElement;
            if (target instanceof HTMLInputElement) {
                if (target.checked === true) {
                    Data.selectedCategory.add(target.id);
                } else {
                    Data.selectedCategory.delete(target.id);
                }
                await this.updateFilters();
            } else if (target instanceof HTMLDivElement) {
                let input = target.querySelector('input') as HTMLInputElement;
                if (input.checked === true) {
                    input.checked = false;

                    Data.selectedCategory.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedCategory.add(input.id);
                }
                await this.updateFilters();
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

                await this.updateFilters();
            }
        });

        return this.container;
    }

    async updateFilters() {
        // TODO: всё это засунуть в функцию (updateFilters - типа такого названия)
        // Data.makeFilteredArray();
        // Data.sort();
        // MainPage.gallery.render();

        // пересчитать диапазоны для слайдеров

        // исправляю: некорректное присваивание
        Data.priceFiltered.max = Data.price.min;
        Data.priceFiltered.min = Data.price.max;
        // Data.priceFiltered.max = Data.price.max;
        // Data.priceFiltered.min = Data.price.min;
        Data.filteredProducts.forEach((x) => {
            if (Data.priceFiltered.min > x.price) Data.priceFiltered.min = x.price;
            if (Data.priceFiltered.max < x.price) Data.priceFiltered.max = x.price;

            if (Data.stockFiltered.min > x.stock) Data.stockFiltered.min = x.stock;
            if (Data.stockFiltered.max < x.stock) Data.stockFiltered.max = x.stock;
        });

        await Data.makeFilteredArray();
        Data.sort();
        MainPage.gallery.render();

        // изменить фильтры brand и слайдеры
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

        await Header.update();
        await Data.makeURL();
    }
}

export default Category;
