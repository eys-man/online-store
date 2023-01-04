import Component from '../components';
import CheckBoxLine from '../checkbox/checkbox';
import Data from '../data';
import './category.css';
import MainPage from '../../pages/main';

class Category extends Component {
    private id: string;
    constructor(tagName: string, className: string, id: string) {
        super(tagName, className);
        this.id = id;
    }

    render() {
        const p = document.createElement('p');
        p.className = 'p';
        p.innerText = this.id;
        this.container.append(p);

        const filterList = document.createElement('div');
        filterList.className = 'filter-list';

        // alert('число категорий = ' + Data.category.size);
        Data.category.forEach((item) => {
            const check = new CheckBoxLine('div', 'checkbox-line', item, false, Data.getQuantityCat(item));
            if (Data.selectedCategory.has(item)) check.checked = true;
            filterList.append(check.render());
        });

        this.container.append(filterList);

        this.container.addEventListener('click', (event: Event) => {
            let target = (event.target as HTMLElement).closest('div') as HTMLElement;
            if (Data.category.has(target.id)) {
                //event.preventDefault(); // убрать браузерный авто-чек
                let input = target.querySelector('input') as HTMLInputElement;
                if (input.checked === true) {
                    input.checked = false;

                    Data.selectedCategory.delete(input.id);
                } else {
                    input.checked = true;

                    Data.selectedCategory.add(input.id);
                }
                Data.makeFilteredArray();
                MainPage.gallery.render();
            }
            // alert(target.id);
        });
        return this.container;
    }
}

export default Category;
