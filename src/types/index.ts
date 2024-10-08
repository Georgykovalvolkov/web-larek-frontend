export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IOrder {
    payMethod: TPayMethod;
    address: string;
    email: string;
    phone: string;
    total: number;
    items: string[];
}

export interface IProductsData {
    products: IProduct[];
    getProduct(productId: string): IProduct | undefined;
}

export interface IUSerData {
    setPaymentAndDelivery(form: TPayData): void
    setContactInfo(form: TEmailData): void
    clearData(): void;
    getUserData(): TUserData;
}

export interface IBasket {
    products: IProduct[];
    total: number;
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    checkProduct: (itemId: string) => boolean;
    clearBasket: () => void;
}

export type TPayMethod = 'cash' | 'card';

export type TUserData = Pick<IOrder, 'email' | 'phone' | 'address' | 'payMethod'>;

export type TPayData = Pick<IOrder, 'address' | 'payMethod'>;

export type TEmailData = Pick<IOrder, 'email' | 'phone'>;
