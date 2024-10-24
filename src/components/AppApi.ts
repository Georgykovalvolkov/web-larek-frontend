import { IApi, IProduct, IOrder } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getProducts(): Promise<{ total: number; items: IProduct[] }> {
		return this._baseApi.get<{ total: number; items: IProduct[] }>(`/product`);
	}

	getProduct(productId: string): Promise<IProduct> {
		return this._baseApi.get<IProduct>(`/product/${productId}`).then((product: IProduct) => product);
	}

	postOrder(data: IOrder): Promise<IOrder> {
		return this._baseApi.post<IOrder>(`/order`, data).then((order: IOrder) => order);
	}

}
