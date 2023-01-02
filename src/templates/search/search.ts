import Component from '../components';
import './search.css';

class Search extends Component {
    reset: HTMLButtonElement;
    search: HTMLInputElement;
    constructor(tagName: string, className: string) {
        super(tagName, className);

        this.reset = document.createElement('button');
        this.reset.className = 'button';
        this.reset.innerText = '🞪';

        this.search = document.createElement('input');
        this.search.type = 'text';
    }

    render() {
        this.container.append(this.search);
        this.container.append(this.reset);

        this.search.addEventListener('input', () => {
            //alert('введено ' + this.search.value);
        });

        this.reset.addEventListener('click', () => {
            //alert('сброс поиска');
            this.search.value = '';
        });

        return this.container;
    }
}

export default Search;
