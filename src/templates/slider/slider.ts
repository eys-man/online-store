import Component from '../components';
import Data from '../data';
import MainPage from '../../pages/main';
import './slider.css';
import Category from '../category/category';
import Brand from '../brand/brand';

type MinMax = {
    min: number;
    max: number;
};

class Slider extends Component {
    private range: MinMax; // ссылка на Data.price или Data.stock
    private rangeFiltered: MinMax; // ссылка на Data.priceFiltered или Data.stockFiltered

    private title: string;

    private pFrom: HTMLElement;
    private pTo: HTMLElement;
    private fromSlider: HTMLInputElement;
    private toSlider: HTMLInputElement;

    constructor(tagName: string, className: string, title: string, range: MinMax, rangeFiltered: MinMax) {
        super(tagName, className);
        this.range = range;
        this.rangeFiltered = rangeFiltered;

        this.title = title;

        this.fromSlider = document.createElement('input');
        this.fromSlider.className = 'slider';
        this.fromSlider.type = 'range';
        this.fromSlider.min = `${range.min}`;
        this.fromSlider.max = `${range.max}`;
        this.fromSlider.value = `${rangeFiltered.min}`;

        this.toSlider = document.createElement('input');
        this.toSlider.className = 'slider';
        this.toSlider.type = 'range';
        this.toSlider.min = `${range.min}`;
        this.toSlider.max = `${range.max}`;
        this.toSlider.value = `${rangeFiltered.max}`;

        this.pFrom = document.createElement('div'); // индикатор величины "от"
        this.pFrom.innerText = `${rangeFiltered.min}/${range.min}`;
        this.pTo = document.createElement('div'); // индикатор величины "до"
        this.pTo.innerText = `${rangeFiltered.max}/${range.max}`;
    }

    controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement) {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        if (from > to) {
            fromSlider.value = `${to}`;
            this.rangeFiltered.min = to; // -------------------------
            this.pFrom.innerText = `${this.rangeFiltered.min}/${this.range.min}`;
        } else {
            this.rangeFiltered.min = from; // -------------------------
            this.pFrom.innerText = `${this.rangeFiltered.min}/${this.range.min}`;
        }

        // TODO: это засунуть в функцию (updateOtherFilters - типа такого названия)
        Data.makeFilteredArray();
        Data.sort();
        MainPage.gallery.render();

        // обновить фильтры category и brand
        let category = document.querySelector('.category') as HTMLElement;
        const categoryFilter = new Category('div', 'category', 'category');
        category.replaceWith(categoryFilter.render());

        let brand = document.querySelector('.brand') as HTMLElement;
        const brandFilter = new Brand('div', 'brand', 'brand');
        brand.replaceWith(brandFilter.render());

        // TODO: пересчитать фильтры stock/price и обновить слайдеры

        const found = document.querySelector('.found') as HTMLElement;
        found.innerHTML = `Found: ${Data.filteredProducts.length}`;
    }

    controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement) {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        // this.setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = `${to}`;
            this.rangeFiltered.max = to; // ------------------------
            this.pTo.innerText = `${this.rangeFiltered.max}/${this.range.max}`;
        } else {
            this.rangeFiltered.max = from; // ------------------------
            this.pTo.innerText = `${this.rangeFiltered.max}/${this.range.max}`;
            toSlider.value = `${from}`;
        }

        // TODO: это засунуть в функцию (updateOtherFilters - типа такого названия)
        Data.makeFilteredArray();
        Data.sort();
        MainPage.gallery.render();

        // обновить фильтры category, brand
        let category = document.querySelector('.category') as HTMLElement;
        const categoryFilter = new Category('div', 'category', 'category');
        category.replaceWith(categoryFilter.render());

        let brand = document.querySelector('.brand') as HTMLElement;
        const brandFilter = new Brand('div', 'brand', 'brand');
        brand.replaceWith(brandFilter.render());

        // TODO: пересчитать фильтры stock/price и обновить слайдеры

        const found = document.querySelector('.found') as HTMLElement;
        found.innerHTML = `Found: ${Data.filteredProducts.length}`;
    }

    getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    // setToggleAccessible(currentTarget: HTMLInputElement) {
    //     if (Number(currentTarget.value) <= 0) {
    //         this.toSlider.style.zIndex = '2';
    //     } else {
    //         this.toSlider.style.zIndex = '0';
    //     }
    // }

    render() {
        const p = document.createElement('p');
        p.className = 'p';
        p.innerText = this.title;
        this.container.append(p);

        const rangeContainer = document.createElement('div');
        rangeContainer.className = 'range-container';

        const formIndicators = document.createElement('div');
        formIndicators.className = 'form-indicators';

        formIndicators.append(this.pFrom);

        formIndicators.append(this.pTo);

        rangeContainer.append(formIndicators);

        const slidersControl = document.createElement('div');
        slidersControl.className = 'sliders-control';

        slidersControl.append(this.fromSlider);

        slidersControl.append(this.toSlider);

        rangeContainer.append(slidersControl);

        this.container.append(rangeContainer);

        this.fromSlider.addEventListener('input', () => {
            this.controlFromSlider(this.fromSlider, this.toSlider);
        });

        this.toSlider.addEventListener('input', () => {
            this.controlToSlider(this.fromSlider, this.toSlider);
        });

        return this.container;
    }
}

export default Slider;
