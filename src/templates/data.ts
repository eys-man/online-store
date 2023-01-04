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
    url: string;
    static viewMode: string;
    static sortingMode: string;
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

    constructor(url: string) {
        this.url = url;
        Data.viewMode = 'tiles'; // по умолчанию вид галереи "плитка"
        // Data.viewMode = 'linear';
        Data.sortingMode = 'sort by price ↑'; // по умолчанию сортировка "цена от меньшей"
        // Data.sortingMode = 'sort by rating ↑';
    }

    static sort() {
        if (Data.sortingMode === 'sort by price ↑') {
            Data.filteredProducts.sort((a, b) => a.price - b.price);
        } else if (Data.sortingMode === 'sort by price ↓') {
            Data.filteredProducts.sort((a, b) => b.price - a.price);
        } else if (Data.sortingMode === 'sort by rating ↑') {
            Data.filteredProducts.sort((a, b) => a.rating - b.rating);
        } else if (Data.sortingMode === 'sort by rating ↓') {
            Data.filteredProducts.sort((a, b) => b.rating - a.rating);
        }
    }

    // число товаров определенной категории
    static getQuantityCat(str: string): number {
        let num: number = 0;
        Data.products.forEach((x) => {
            if (x.category === str) num += 1;
        });
        return num;
    }

    // число товаров определенного бренда
    static getQuantityBrand(str: string): number {
        let num: number = 0;
        Data.products.forEach((x) => {
            if (x.brand === str) num += 1;
        });
        return num;
    }

    static makeFilteredArray() {
        Data.filteredProducts.length = 0; // очистить массив
        // пропустить через фильтр
        Data.products.forEach((x) => {
            if (
                Data.selectedCategory.has(x.category) &&
                Data.selectedBrand.has(x.brand) &&
                x.price >= Data.priceFiltered.min &&
                x.price <= Data.priceFiltered.max &&
                x.stock >= Data.stockFiltered.min &&
                x.stock <= Data.priceFiltered.max
            ) {
                Data.filteredProducts.push(x);
            }
        });
    }

    async getData() {
        let response = await fetch(this.url);
        if (response.ok) {
            Data.data = await response.json();
            Data.products = Data.data['products'].slice(0);

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
                // найти в каталоге минимальные и макс. кол-ва товаров на складе
                if (Data.stock.min === -1) Data.stock.min = x.stock;
                if (Data.stock.max === -1) Data.stock.max = x.stock;
                if (Data.stock.min > x.price) Data.stock.min = x.stock;
                if (Data.stock.max < x.price) Data.stock.max = x.stock;
            });

            // по умолчанию ползунки слайдеров в мин. и макс. положениях
            Data.priceFiltered.max = Data.price.max;
            Data.priceFiltered.min = Data.price.min;

            Data.stockFiltered.max = Data.stock.max;
            Data.stockFiltered.min = Data.stock.min;

            // отсортировать отфильтрованный массив режимом сортировки по умолчанию
            Data.makeFilteredArray();
            Data.sort();

            // TODO: прочитать из localstore min/max price, min/max stock,
            // фильтры по брендам и категориям
            // и массив выбранных в корзину товаров

            // вручную добавленные в корзину элементы
            Data.selectedItems.add({ id: 1, quantity: 5 });
            Data.selectedItems.add({ id: 7, quantity: 1 });
            Data.selectedItems.add({ id: 9, quantity: 3 });
            Data.selectedItems.add({ id: 34, quantity: 1 });
            Data.selectedItems.add({ id: 87, quantity: 2 });

            // return Data.data;
        } else {
            alert('error ' + response.status);
        }
    }
}

export default Data;
