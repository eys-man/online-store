type MinMax = {
    min: number;
    max: number;
};

export interface Item {
    id: number; // id товара
    quantity: number; // выбранное число товаров
}

export interface Product {
    id: string;
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
    static data: Products;
    public static products: Array<Product> = new Array<Product>();
    public static category: Set<string> = new Set<string>();
    public static selectedCategory: Set<string> = new Set<string>(); // множество выбранных категорий
    public static brand: Set<string> = new Set<string>();
    public static selectedBrand: Set<string> = new Set<string>(); // множество выбранных брендов
    public static selectedItems: Set<Item> = new Set<Item>(); // отобранные в корзину товары
    public static price: MinMax = { min: -1, max: -1 };
    public static priceFiltered: MinMax = { min: -1, max: -1 };
    public static stock: MinMax = { min: -1, max: -1 };
    public static stockFiltered: MinMax = { min: -1, max: -1 };

    constructor(url: string) {
        this.url = url;
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

    async getData() {
        let response = await fetch(this.url);
        if (response.ok) {
            Data.data = await response.json();
            Data.products = Data.data['products'].slice(0);

            Data.products.forEach((x) => {
                Data.category.add(x.category);
                Data.brand.add(x.brand);

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

            Data.priceFiltered.max = Data.price.max;
            Data.priceFiltered.min = Data.price.min;

            Data.stockFiltered.max = Data.stock.max;
            Data.stockFiltered.min = Data.stock.min;
            // TODO: прочитать из localstore min/max price, min/max stock
            // и массив выбранных товаров
            // return Data.data;
        } else {
            alert('error ' + response.status);
        }
    }
}

export default Data;
