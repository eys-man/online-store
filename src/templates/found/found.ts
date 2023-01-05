import Component from '../components';
import Data from '../data';
import './found.css';

class Found extends Component {
    #found: number;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        // this.selector = document.createElement('select');
        this.#found = 100;
    }

    get found() {
        return this.#found;
    }

    set found(n: number) {
        if (n >= 0) this.#found = n;
    }

    render() {
        // this.container.innerHTML = `Found: ${this.#found}`;
        this.container.innerHTML = `Found: ${Data.filteredProducts.length}`;

        return this.container;
    }
}

export default Found;
