import Data, { Item } from '../templates/data';
import Page from '../templates/page';
import ShoppingCard from '../templates/shopping-card/shopping-card';

class CartPage extends Page {
    numPages: number; // полное число страниц
    curPage: number; // текущая страницп
    itemsPerPage: number; // макс. число товаров на странице
    constructor(id: string) {
        super(id);

        // TODO: прочитать из localStorage selectedItems и настройки пагинации
        let isLoad: boolean = true;
        let selectedItems: Item[] = [];
        if (localStorage.getItem('selectedItems') === null) {
            Data.selectedItems = new Set(selectedItems);
            isLoad = false;
        } else {
            selectedItems = JSON.parse(localStorage.getItem('selectedItems') as string);
            Data.selectedItems = new Set(selectedItems);
        }

        if (localStorage.getItem('curPage') === null) {
            this.curPage = 1; // страница по умолчанию
            isLoad = false;
        } else {
            this.curPage = JSON.parse(localStorage.getItem('curPage') as string);
        }

        if (localStorage.getItem('itemsPerPage') === null) {
            this.itemsPerPage = 1; // страница по умолчанию
            isLoad = false;
        } else {
            this.itemsPerPage = JSON.parse(localStorage.getItem('itemsPerPage') as string);
        }

        if (isLoad === false) {
            // TODO: прочитать URL

            // настройки просмотра по умолчанию
            this.itemsPerPage = 5; // по умолчанию
        }
        this.numPages = Math.ceil(Data.selectedItems.size / this.itemsPerPage);
    }

    render() {
        this.container.innerHTML = '';
        if (Data.selectedItems.size != 0) {
            // TODO: записать в localStorage настройки просмотра
            localStorage.setItem('itemsPerPage', JSON.stringify(this.itemsPerPage));
            localStorage.setItem('curPage', JSON.stringify(this.curPage));

            this.numPages = Math.ceil(Data.selectedItems.size / this.itemsPerPage);
            if (this.curPage > this.numPages) this.curPage = this.numPages;

            const cart = document.createElement('div');
            cart.className = 'shopping-cart';

            const cardList = document.createElement('div');
            cardList.className = 'card-list';
            cart.append(cardList);

            const cardListHeader = document.createElement('div');
            cardListHeader.className = 'card-list-header';

            const limit = document.createElement('div');
            limit.className = 'limit';

            // число товаров на странице
            const limitP = document.createElement('p');
            limitP.innerText = 'Items per page [3 - 10]';
            limit.append(limitP);

            const limitInput = document.createElement('input');
            limitInput.type = 'number';

            limitInput.value = `${this.itemsPerPage}`;
            limitInput.min = '3';
            limitInput.max = '10';
            limitInput.step = '1';

            limit.append(limitInput);

            cardListHeader.append(limit);

            // номер отображаемой страницы
            const page = document.createElement('div');
            page.className = 'page';

            const pageP = document.createElement('p');
            pageP.innerText = 'Page';
            page.append(pageP);

            const pageInput = document.createElement('input');
            pageInput.type = 'number';

            pageInput.type = 'number';

            pageInput.value = `${this.curPage}`;
            pageInput.min = '1';
            pageInput.max = `${this.numPages}`;
            pageInput.step = '1';

            page.append(pageInput);

            cardListHeader.append(page);

            cardList.append(cardListHeader);

            // вывод списка товаров в корзине
            let serialNumber: number = 1; // текущий номер товара (пишется спереди)
            const beginNumber = this.itemsPerPage * (this.curPage - 1) + 1; // с этого номера начнется отображение
            Data.selectedItems.forEach((x) => {
                if (serialNumber >= beginNumber && serialNumber < beginNumber + this.itemsPerPage) {
                    const card = new ShoppingCard('div', 'shopping-card', x, serialNumber, this);
                    cardList.append(card.render());
                }
                serialNumber += 1;
            });
            cart.append(cardList);

            const summary = document.createElement('div');
            summary.className = 'summary';
            cart.append(summary);

            limitInput.addEventListener('input', () => {
                if (Number(limitInput.value) > 10) {
                    console.log('много');
                    this.itemsPerPage = 10;
                    limitInput.value = `${this.itemsPerPage}`;
                } else if (Number(limitInput.value) < 3) {
                    console.log('мало');
                    this.itemsPerPage = 3;
                    limitInput.value = `${this.itemsPerPage}`;
                } else {
                    this.itemsPerPage = Number(limitInput.value);
                }
                this.render();
            });

            pageInput.addEventListener('input', () => {
                if (Number(pageInput.value) > this.numPages) {
                    console.log('много');
                    this.curPage = this.numPages;
                    pageInput.value = `${this.curPage}`;
                } else if (Number(pageInput.value) < 1) {
                    console.log('мало');
                    pageInput.value = '1';
                    this.curPage = 1;
                } else {
                    this.curPage = Number(pageInput.value);
                }
                this.render();
            });

            this.container.append(cart);
        } else {
            const empty = document.createElement('p');
            empty.innerText = 'Cart is empty';
            this.container.append(empty);
        }
        return this.container;
    }
}

export default CartPage;
