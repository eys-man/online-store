import Page from '../templates/page';

class ProductPage extends Page {
    static TextObject = {
        MainTitle: 'Product Page',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const p = document.createElement('p');
        p.innerHTML = ProductPage.TextObject.MainTitle;
        this.container.append(p);
        return this.container;
    }
}

export default ProductPage;
