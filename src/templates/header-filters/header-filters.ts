// import Brand from '../brand/brand';
// import Category from '../category/category';
import MainPage from '../../pages/main';
import Component from '../components';
import Data from '../data';
// import Header from '../header/header';
// import Slider from '../slider/slider';
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

        this.container.addEventListener('click', async (event) => {
            const target = event.target;
            if (target instanceof HTMLButtonElement) {
                if (target?.innerText === 'Reset filters') {
                    Data.reset();
                    Data.makeFilteredArray();
                    Data.sort();
                    MainPage.gallery.render();

                    const aside = document.querySelector('.filters') as HTMLElement;
                    aside.innerHTML = '';
                    MainPage.renderFilters(aside);

                    const found = document.body.querySelector('.found') as HTMLElement;
                    found.innerHTML = `Found: ${Data.filteredProducts.length}`;

                    const search = document.body.querySelector('.search') as HTMLElement;
                    (search.querySelector('input') as HTMLInputElement).value = '';
                    // Header.update();
                    await Data.makeURL();
                } else if (target?.innerText === 'Copy link') {
                    target.innerText = 'Copying...';
                    setInterval(() => {
                        navigator.clipboard
                            .writeText(window.location.href)
                            .then(() => {
                                // alert('Получилось!');
                                target.innerText = 'Copy link';
                            })
                            .catch((err) => {
                                console.log('Что-то пошло не так...', err);
                            });
                    }, 500);
                    // alert('Copy link');
                    // TODO: скопировать URL страницы в буфер обмена
                    // navigator.clipboard
                    //     .writeText(window.location.href)
                    //     .then(() => {
                    //         // alert('Получилось!');
                    //         target.innerText = 'Copy link';
                    //     })
                    //     .catch((err) => {
                    //         console.log('Что-то пошло не так...', err);
                    //     });
                }
            }
        });

        return this.container;
    }
}

export default HeaderFilters;
