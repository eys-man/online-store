import CardSquare from '../card-square/card-square';
import Component from '../components';
import Data from '../data';
import './gallery.css';

class Gallery extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        Data.products.forEach((x) => {
            const card = new CardSquare('div', 'card-square', x);

            this.container.append(card.render());
        });

        return this.container;
    }
}

export default Gallery;
