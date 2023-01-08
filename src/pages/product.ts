import Page from '../templates/page';

class ProductPage extends Page {
    id: number;
    url: URL;
    constructor(id: string) {
        super(id);
        // разобрать url
        this.url = new URL(window.location.href);
        this.id = Number(this.url.searchParams.get('id'));
        // alert('id = ' + this.id);
    }

    render() {
        const p = document.createElement('p');
        p.innerHTML = `id = ${this.id}`;
        this.container.append(p);
        return this.container;
    }
}

export default ProductPage;
