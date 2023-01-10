import Page from '../templates/page';
import ProductCard from '../templates/product-card/product-card';

class ProductPage extends Page {
    id: number;
    url: URL;
    card: ProductCard;
    constructor(id: string) {
        super(id);
        // разобрать url
        this.url = new URL(window.location.href);
        this.id = Number(this.url.searchParams.get('id'));
        // alert('id = ' + this.id);
        this.card = new ProductCard('div', 'product-card', this.id);
    }

    render() {
        this.container.append(this.card.render());

        return this.container;
    }
}

export default ProductPage;
