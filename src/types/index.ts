export interface IProduct {
    _id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IUser {
    payMethod: string;
    address: string;
    email: string;
    phone: string;
}

export interface IProductsData {
    cards: IProduct[];
    preview: string | null;
    getProduct(productId: string): IProduct;
}

export interface IUSerData {
    _payMethod: string;
    _address: string;
    _email: string;
    _phone: string;
    getPayMethod(): TPayMethod;
    getUserInfo(): TUserData;
    setUserInfo(userData: IUser): void;
    SetPayMethod(payMethod: string): void;
    checkValidation(data: Record<keyof TUserData, string>): boolean;
}

export interface IBasket {
    products: IProduct[];
    product: string | null;
    addProduct(product: IProduct): void;
    deleteProduct(productId: string): void;
    priceCalc(productPrice: number): void;
}


export type TCardMain = Pick<IProduct, 'image' | 'title' | 'category' | 'price'>;

export type TCardModal = Pick<IProduct, 'description' | 'image' | 'title' | 'category' | 'price'>;

export type TBasket = Pick<IProduct, 'title' | 'price'>;

export type TPayMethod = Pick<IUser, 'payMethod'>;

export type TUserData = Pick<IUser, 'address' | 'email' | 'phone'>;