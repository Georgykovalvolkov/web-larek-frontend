import { IProduct, IProductsData } from "../types/index";
import { IEvents } from "./base/events";

export class ProductsData implements IProductsData {
    protected _products: IProduct[];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }
    
    getProduct(productId: string): IProduct | undefined {
        return this._products.find((product) => product.id === productId);
    }

    get products(): IProduct[] {
        return this._products;
    }

    set products(products: IProduct[]) {
        this._products = products;
        this.events.emit('products:changed');
    }
}


