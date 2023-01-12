// import Search from './search/search';

type MinMax = {
    min: number;
    max: number;
};

export interface Item {
    id: number; // id товара
    quantity: number; // выбранное число товаров
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>;
}

export interface Products {
    products: Array<Product>;
    total: number;
    skip: number;
    limit: number;
}

class Data {
    dataURL: string; // ссыль на страницу с данными
    static pageURL: URL; // динамически обновляемый URL страницы
    static search: string;
    static viewMode: string;
    static sortingMode: string;
    static totalCost: number;
    static totalItems: number; // полное число товаров (включая несколько одного вида)
    static data: Products;
    static products: Array<Product> = new Array<Product>(); // массив всех продуктов, полученных из интернета
    static filteredProducts: Array<Product> = new Array<Product>(); // массив продуктов после фильтрации (отображаемый)
    static category: Set<string> = new Set<string>(); // множество всех категорий
    static selectedCategory: Set<string> = new Set<string>(); // множество выбранных категорий в фильтрах
    static brand: Set<string> = new Set<string>(); // множество всех брэндов
    static selectedBrand: Set<string> = new Set<string>(); // множество выбранных брендов в фильтрах
    static selectedItems: Set<Item> = new Set<Item>(); // отобранные в корзину товары
    static price: MinMax = { min: -1, max: -1 }; // диапазон цен ВСЕХ продуктов
    static priceFiltered: MinMax = { min: -1, max: -1 }; // диапазон цен мин/макс отфильтрованный
    static stock: MinMax = { min: -1, max: -1 }; // диапазон количества на складе ВСЕХ продуктов
    static stockFiltered: MinMax = { min: -1, max: -1 }; // диапазон количества продуктов на складе отфильтрованный

    constructor(dataURL: string) {
        Data.pageURL = new URL(window.location.href);
        Data.pageURL.hash = 'main-page';
        Data.pageURL.search = '';

        window.history.pushState(null, '', Data.pageURL);
        window.history.replaceState(null, '', Data.pageURL);
        window.location.hash = 'main-page';

        // alert('конструктор Data: URL страницы = ' + window.location);
        // alert('конструктор Data: pageURL = ' + Data.pageURL + ', hash = ' + Data.pageURL.hash);

        this.dataURL = dataURL;
        Data.viewMode = 'tiles'; // по умолчанию вид галереи "плитка"
        Data.sortingMode = 'sort by price ↑'; // по умолчанию сортировка "цена от меньшей"
        Data.totalCost = 0;
        Data.totalItems = 0;
        Data.search = '';
    }

    static sort() {
        if (Data.sortingMode === 'sort by price ↑') {
            Data.filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
        } else if (Data.sortingMode === 'sort by price ↓') {
            Data.filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
        } else if (Data.sortingMode === 'sort by rating ↑') {
            Data.filteredProducts.sort((a, b) => Number(a.rating) - Number(b.rating));
        } else if (Data.sortingMode === 'sort by rating ↓') {
            Data.filteredProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
        }
    }

    // TODO: можно/нужно сделать одной функцией 4 низлежащие с входными параметрами
    // («массив_по_которому_поиск», «строка_которую_ищут»)
    // число всех товаров определенной категории
    static getQuantityCat(str: string): number {
        let num: number = 0;
        Data.products.forEach((x) => {
            if (x.category === str) num += 1;
        });
        return num;
    }

    // число отфильтрованных товаров определенной категории
    static getQuantityCatFiltered(str: string): number {
        let num: number = 0;
        Data.filteredProducts.forEach((x) => {
            if (x.category === str) num += 1;
        });
        return num;
    }

    // число всех товаров определенного бренда
    static getQuantityBrand(str: string): number {
        let num: number = 0;
        Data.products.forEach((x) => {
            if (x.brand === str) num += 1;
        });
        return num;
    }

    // число отфильтрованных товаров определенного бренда
    static getQuantityBrandFiltered(str: string): number {
        let num: number = 0;
        Data.filteredProducts.forEach((x) => {
            if (x.brand === str) num += 1;
        });
        return num;
    }

    // ------------- создать массив товаров согласно фильтрации ----------
    static async makeFilteredArray() {
        Data.filteredProducts = []; // очистить массив
        // пропустить через фильтр бренд + категория
        Data.products.forEach((x) => {
            if (
                Data.selectedCategory.has(x.category) &&
                Data.selectedBrand.has(x.brand) &&
                x.price >= Data.priceFiltered.min &&
                x.price <= Data.priceFiltered.max &&
                x.stock >= Data.stockFiltered.min &&
                x.stock <= Data.stockFiltered.max
            ) {
                Data.filteredProducts.push(x);
            }
        });

        // найти макс/мин значения цены/сток в полученном выше массиве

        // инициализация поиска: приравнять макс/мин цены/сток в первому элементу
        if (Data.filteredProducts.length > 0) {
            Data.priceFiltered.min = Data.filteredProducts[0].price;
            Data.priceFiltered.max = Data.filteredProducts[0].price;
            Data.stockFiltered.min = Data.filteredProducts[0].stock;
            Data.stockFiltered.max = Data.filteredProducts[0].stock;
        } else {
            Data.priceFiltered.min = Data.price.min;
            Data.priceFiltered.max = Data.price.max;
            Data.stockFiltered.min = Data.stock.min;
            Data.stockFiltered.max = Data.stock.max;
        }

        // уточнить/обновить среди отфильтрованных товаров макс и мин цены/наличие
        Data.filteredProducts.forEach((x) => {
            if (x.price < Data.priceFiltered.min) Data.priceFiltered.min = x.price;
            if (x.price > Data.priceFiltered.max) Data.priceFiltered.max = x.price;
            if (x.stock < Data.stockFiltered.min) Data.stockFiltered.min = x.stock;
            if (x.stock > Data.stockFiltered.max) Data.stockFiltered.max = x.stock;
        });
        // если был поиск по строке
        if (Data.search != '') {
            for (let i: number = 0; i < Data.filteredProducts.length; ) {
                let x: Product = Data.filteredProducts[i];
                if (
                    x.title.indexOf(Data.search) === -1 &&
                    x.description.indexOf(Data.search) === -1 &&
                    x.brand.indexOf(Data.search) === -1 &&
                    x.category.indexOf(Data.search) === -1
                ) {
                    // не нашел - удалить из массива
                    // alert('удаляем из массива');
                    Data.filteredProducts.splice(i, 1);
                    i -= 1;
                }
                i += 1;
            }
        }

        await Data.saveData();
    }

    // ---------------- сброс фильтров ------------------------
    static async reset() {
        // здесь «сбросить» - это значит выбрать все позиции в фильтрах
        Data.products.forEach((x) => {
            Data.category.add(x.category);
            Data.brand.add(x.brand);

            // по умолчанию выбраны все фильтры категории и брэнды
            Data.selectedCategory.add(x.category);
            Data.selectedBrand.add(x.brand);

            // найти в каталоге минимальную и макс. цены
            if (Data.price.min === -1) Data.price.min = x.price;
            if (Data.price.max === -1) Data.price.max = x.price;
            if (Data.price.min > x.price) Data.price.min = x.price;
            if (Data.price.max < x.price) Data.price.max = x.price;
            // найти в каталоге мин. и макс. кол-ва товаров на складе
            if (Data.stock.min === -1) Data.stock.min = x.stock;
            if (Data.stock.max === -1) Data.stock.max = x.stock;
            if (Data.stock.min > x.stock) Data.stock.min = x.stock;
            if (Data.stock.max < x.stock) Data.stock.max = x.stock;
        });

        // по умолчанию ползунки слайдеров в мин. и макс. положениях
        Data.priceFiltered.max = Data.price.max;
        Data.priceFiltered.min = Data.price.min;

        Data.stockFiltered.max = Data.stock.max;
        Data.stockFiltered.min = Data.stock.min;

        Data.search = '';

        // отсортировать отфильтрованный массив режимом сортировки по умолчанию
        await Data.makeFilteredArray();
        Data.sort();

        // await Search.reset();
        // await Data.saveData();
    }

    // обновить полную стоимость в хэдере
    static async updateCost() {
        // alert('update');
        Data.totalCost = 0;
        Data.totalItems = 0;
        Data.selectedItems.forEach((x) => {
            Data.totalCost += Data.products[x.id - 1].price * x.quantity;
            Data.totalItems += x.quantity;
        });
    }

    async getData() {
        let response = await fetch(this.dataURL);
        if (response.ok) {
            Data.data = await response.json();
            Data.products = Data.data['products'].slice(0);

            // if (!(await Data.loadData())) {
            //     // если не прочитали фильтры из localStorage
            //     // TODO: прочитать из URL

            //     await Data.reset();
            // }
            // if (await Data.loadData()) {
            //     // отсортировать отфильтрованный массив режимом сортировки по умолчанию
            //     await Data.makeFilteredArray();
            //     Data.sort();
            // } else {
            //     Data.reset();
            // }

            // Data.reset();
            Data.reset();

            await Data.updateCost();

            // return Data.data;
        } else {
            alert('error ' + response.status);
        }
    }

    // сохранить фильтры в localStorage
    static async saveData() {
        localStorage.setItem('search', Data.search);
        localStorage.setItem('viewMode', Data.viewMode);
        localStorage.setItem('sortingMode', Data.sortingMode);

        const selectedCategory: Array<string> = Array.from(Data.selectedCategory);
        localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));

        const selectedBrand: Array<string> = Array.from(Data.selectedBrand);
        localStorage.setItem('selectedBrand', JSON.stringify(selectedBrand));

        const selectedItems: Array<Item> = Array.from(Data.selectedItems);
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

        const priceFiltered = JSON.stringify(Data.priceFiltered);
        localStorage.setItem('priceFiltered', priceFiltered);

        const stockFiltered = JSON.stringify(Data.stockFiltered);
        localStorage.setItem('stockFiltered', stockFiltered);

        // await Data.makeURL();
    }

    static async loadData() {
        let isLoad: Boolean = true; // есть в localStorage или нет
        // если хоть один не прочитается - данные не прочитаны из localStorage
        // search
        if (localStorage.getItem('search') === null) {
            Data.search = '';
            isLoad = false;
        } else {
            // Data.search = JSON.parse(localStorage.getItem('search') as string);
            Data.search = localStorage.getItem('search') as string;
            alert('search = ' + this.search);
        }
        // viewMode
        if (localStorage.getItem('viewMode') === null) {
            Data.viewMode = 'tiles';
            isLoad = false;
        } else {
            // Data.viewMode = JSON.parse(localStorage.getItem('viewMode') as string);
            Data.viewMode = localStorage.getItem('viewMode') as string;
            alert('viewMode = ' + this.viewMode);
        }
        // sortingMode
        if (localStorage.getItem('sortingMode') === null) {
            Data.sortingMode = 'sort by price ↑';
            isLoad = false;
        } else {
            // Data.sortingMode = JSON.parse(localStorage.getItem('sortingMode') as string);
            Data.sortingMode = localStorage.getItem('sortingMode') as string;
            alert('sortingMode = ' + this.sortingMode);
        }
        // selectedCategory
        let category: string[] = [];
        if (localStorage.getItem('selectedCategory') === null) {
            Data.selectedCategory = new Set(category);
            isLoad = false;
        } else {
            category = JSON.parse(localStorage.getItem('selectedCategory') as string);
            Data.selectedCategory = new Set(category);
            alert('category: ' + category);
        }
        // selectedBrand
        let brand: string[] = [];
        if (localStorage.getItem('selectedBrand') === null) {
            Data.selectedBrand = new Set(brand);
            isLoad = false;
        } else {
            brand = JSON.parse(localStorage.getItem('selectedBrand') as string);
            Data.selectedBrand = new Set(brand);
            alert('brand: ' + brand);
        }
        // selectedItems
        let selectedItems: Item[] = [];
        if (localStorage.getItem('selectedItems') === null) {
            Data.selectedItems = new Set(selectedItems);
            isLoad = false;
        } else {
            selectedItems = JSON.parse(localStorage.getItem('selectedItems') as string);
            alert('selectedItems: ' + selectedItems);
            Data.selectedItems = new Set(selectedItems);
        }

        // priceFiltered
        if (localStorage.getItem('priceFiltered') === null) {
            Data.priceFiltered = { min: -1, max: -1 };
            isLoad = false;
        } else {
            Data.priceFiltered = JSON.parse(localStorage.getItem('priceFiltered') as string);
            alert(Data.priceFiltered);
        }

        // stockFiltered
        if (localStorage.getItem('stockFiltered') === null) {
            Data.stockFiltered = { min: -1, max: -1 };
            isLoad = false;
        } else {
            Data.stockFiltered = JSON.parse(localStorage.getItem('stockFiltered') as string);
            alert(Data.stockFiltered);
        }
        return isLoad;
    }

    static async makeURL() {
        Data.pageURL.search = '';
        Data.pageURL.searchParams.set('search', Data.search);
        Data.pageURL.searchParams.set('viewMode', Data.viewMode);
        Data.pageURL.searchParams.set('sortingMode', Data.sortingMode);

        const selectedCategory = Array.from(Data.selectedCategory);
        Data.pageURL.searchParams.set('selectedCategory', JSON.stringify(selectedCategory));

        const selectedBrand = Array.from(Data.selectedBrand);
        Data.pageURL.searchParams.set('selectedBrand', JSON.stringify(selectedBrand));

        const selectedItems: Array<Item> = Array.from(Data.selectedItems);
        Data.pageURL.searchParams.set('selectedItems', JSON.stringify(selectedItems));

        const priceFiltered = JSON.stringify(Data.priceFiltered);
        Data.pageURL.searchParams.set('priceFiltered', JSON.stringify(priceFiltered));

        const stockFiltered = JSON.stringify(Data.stockFiltered);
        Data.pageURL.searchParams.set('stockFiltered', JSON.stringify(stockFiltered));

        // window.history.pushState(null, '', Data.pageURL);
        window.history.replaceState(null, '', Data.pageURL);
    }
}

export default Data;
