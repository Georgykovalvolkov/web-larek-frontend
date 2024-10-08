import { IEvents } from "./base/events";
import { IBasket, IProduct } from "../types";


export class BasketData implements IBasket {
    protected _products: IProduct[] = [];
    protected _total: number;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    addProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit("product:add");
    }

    deleteProduct(productId: string): void {
        const productIndex = this._products.findIndex(product => product.id === productId);
        if (productIndex >= 0) {
            this.products.splice(productIndex, 1);
        }
        this.events.emit("product:delete");
    }

    clearBasket(): void {
        this._products = [];
        this._total = 0;
        this.events.emit("basket:clear");
    }

    checkProduct(itemId: string): boolean {
        return this._products.some(product => product.id === itemId);
    };

    get products(): IProduct[] {
        return this._products;
    };

    get total(): number {
        return this._products.reduce((total, product) => total + product.price, 0);
    };

}