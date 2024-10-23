export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IOrder {
    payment: TPayMethod;
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
    setPaymentAndDelivery(form: Record<string, string>): void
    setContactInfo(form: Record<string, string>): void
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

export type TUserData = Pick<IOrder, 'email' | 'phone' | 'address' | 'payment'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
