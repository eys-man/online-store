import Component from '../components';
import './selector.css';

class Selector extends Component {
    options = ['sort by price ↑', 'sort by price ↓', 'sort by rating ↑', 'sort by rating ↓'];
    sortingMode: string;
    constructor(tagName: string, className: string) {
        super(tagName, className);
        this.sortingMode = this.options[0];

        this.options.forEach((x) => {
            const opt = document.createElement('option');
            opt.value = x;
            opt.text = x;
            this.container.append(opt);
        });
    }

    render() {
        // this.container.append(this.selector);

        this.container.addEventListener('change', () => {
            if (this.sortingMode !== (this.container as HTMLSelectElement).value) {
                this.sortingMode = (this.container as HTMLSelectElement).value;
                alert('выбрана сортировка ' + this.sortingMode);

                // TODO: отсортировать массив товаров для вывода
            }
        });

        return this.container;
    }
}

export default Selector;
