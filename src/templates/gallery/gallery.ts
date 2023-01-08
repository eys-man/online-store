import Card from '../card/card';
import Component from '../components';
import Data from '../data';
import './gallery.css';

class Gallery extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        if (Data.filteredProducts.length === 0) {
            this.container.innerHTML = `Sorry, there are no products matching your search`;
        } else {
            this.container.innerHTML = '';
            Data.filteredProducts.forEach((x) => {
                const card = new Card('div', 'card', x);

                this.container.append(card.render());
            });
        }

        return this.container;
    }
}

export default Gallery;
