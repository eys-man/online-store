import Page from '../templates/page';
import Category from '../templates/category/category';
import Brand from '../templates/brand/brand';
import HeaderFilters from '../templates/header-filters/header-filters';
import Slider from '../templates/slider/slider';
import Data from '../templates/data';
import Gallery from '../templates/gallery/gallery';
import HeaderGallery from '../templates/header-gallery/header-gallery';

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Main Page',
    };

    constructor(id: string) {
        super(id);
        this.container.className = 'main-page';
    }

    render() {
        const aside = document.createElement('aside');
        aside.className = 'filters';

        const headerFilters = new HeaderFilters('div', 'header-links');
        aside.append(headerFilters.render());

        const categoryFilter = new Category('div', 'category', 'category');
        aside.append(categoryFilter.render());

        const brandFilter = new Brand('div', 'brand', 'brand');
        aside.append(brandFilter.render());

        const priceFilter = new Slider('div', 'price', 'price', Data.price, Data.priceFiltered);
        aside.append(priceFilter.render());

        const stockFilter = new Slider('div', 'stock', 'stock', Data.stock, Data.stockFiltered);
        aside.append(stockFilter.render());

        this.container.append(aside);

        // ------------------ правая часть -----------------------
        const section = document.createElement('section');
        section.className = 'gallery-container';
        const headerGallery = new HeaderGallery('div', 'header-gallery');
        section.append(headerGallery.render());

        const gallery = new Gallery('div', 'gallery');
        section.append(gallery.render());

        this.container.append(section);

        return this.container;
    }
}

export default MainPage;
