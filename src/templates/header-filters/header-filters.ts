import Component from '../components';
import './header-filters.css';

class HeaderFilters extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    render() {
        const reset = document.createElement('button');
        reset.className = 'button';
        reset.innerText = 'Reset filters';
        this.container.append(reset);

        const copyLink = document.createElement('button');
        copyLink.className = 'button';
        copyLink.innerText = 'Copy link';
        this.container.append(copyLink);

        this.container.addEventListener('click', (event) => {
            let target = (event.target as HTMLButtonElement).closest('button');

            if (target?.innerText === 'Reset filters') {
                alert('Reset filters');
                // TODO:
            } else if (target?.innerText === 'Copy link') {
                alert('Copy link');
            }
        });

        return this.container;
    }
}

export default HeaderFilters;
