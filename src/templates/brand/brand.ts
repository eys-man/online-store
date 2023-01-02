import Component from '../components';
import CheckBoxLine from '../checkbox/checkbox';
import Data from '../data';
import './brand.css';

class Brand extends Component {
    private id: string;
    constructor(tagName: string, className: string, id: string) {
        super(tagName, className);
        this.id = id;
    }

    render() {
        const p = document.createElement('p');
        p.innerText = this.id;
        p.className = 'p';
        this.container.append(p);

        const filterList = document.createElement('div');
        filterList.className = 'filter-list';

        // alert('число брэндов = ' + Data.brand.size);
        Data.brand.forEach((item) => {
            const check = new CheckBoxLine('div', 'checkbox-line', item, Data.getQuantityBrand(item));
            filterList.append(check.render());
        });

        this.container.append(filterList);

        this.container.addEventListener('click', (event: Event) => {
            let target = (event.target as HTMLElement).closest('div') as HTMLElement;
            if (Data.brand.has(target.id)) {
                event.preventDefault(); // убрать браузерный авто-чек
                let input = target.querySelector('input') as HTMLInputElement;
                if (input.checked === true) {
                    input.checked = false;

                    Data.selectedBrand.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedBrand.add(input.id);
                }
            }
            // alert(target.id);
        });

        return this.container;
    }
}

export default Brand;
