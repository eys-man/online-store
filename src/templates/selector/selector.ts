import Component from '../components';
import './selector.css';

class Selector extends Component {
    options = ['sort by price ↑', 'sort by price ↓', 'sort by rating ↑', 'sort by rating ↓'];
    constructor(tagName: string, className: string) {
        super(tagName, className);
        // this.selector = document.createElement('select');
        this.options.forEach((x) => {
            const opt = document.createElement('option');
            opt.value = x;
            opt.text = x;
            // alert('добавил ' + x);
            this.container.append(opt);
        });
    }

    render() {
        // this.container.append(this.selector);

        this.container.addEventListener('change', () => {
            //alert('выбрана сортировка ' + (this.container as HTMLSelectElement).value);
            // TODO: отсортировать массив товаров для вывода
        });

        return this.container;
    }
}

export default Selector;
