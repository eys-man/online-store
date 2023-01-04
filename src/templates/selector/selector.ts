import MainPage from '../../pages/main';
import Component from '../components';
import Data from '../data';
import './selector.css';

class Selector extends Component {
    options = ['sort by price ↑', 'sort by price ↓', 'sort by rating ↑', 'sort by rating ↓'];

    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.options.forEach((x) => {
            const opt = document.createElement('option');
            opt.value = x;
            opt.text = x;
            this.container.append(opt);
        });

        (this.container as HTMLSelectElement).value = Data.sortingMode;
    }

    render() {
        this.container.addEventListener('change', () => {
            if (Data.sortingMode !== (this.container as HTMLSelectElement).value) {
                Data.sortingMode = (this.container as HTMLSelectElement).value;
                // отсортировать массив товаров для вывода
                Data.sort();
                MainPage.gallery.render();
            }
        });

        return this.container;
    }
}

export default Selector;
