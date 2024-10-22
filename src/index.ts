import './scss/styles.scss';
import { ProductsData } from './components/ProductsData';
import { UserData } from './components/UserData';
import { BasketData } from './components/BasketData';
import { EventEmitter } from './components/base/events';
import { IApi, TPayMethod } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/AppApi';
import { Card } from './components/Card';
import { IProduct } from './types';
import { CardsCatalog } from './components/CardsCatalog';
import { CardsBasket } from './components/CardsBasket';
import { Modal } from './/components/common/Modal';
import { ModalWithPayment } from './components/ModalWithPayment';
import { ModalWithForm } from './components/ModalWithForm';
import { ModalWithSucces } from './components/ModalWithSucces';

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

//ищем шаблоны в DOM
const cardsCatalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.getElementById('card-basket') as HTMLTemplateElement;
const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
const paymentTemplate = document.getElementById('order') as HTMLTemplateElement;
const formTemplate = document.getElementById('contacts') as HTMLTemplateElement;
const succesTemplate = document.getElementById('success') as HTMLTemplateElement;

//ищем контейнеры в DOM
const basket = document.querySelector('.header__basket');
const basketCounter = basket.querySelector('.header__basket-counter');
const gallery = document.querySelector('.gallery') as HTMLElement;
const modalContainer = document.getElementById('modal-container') as HTMLElement;

//создаем экземпляры классов
const events = new EventEmitter();
const productsData = new ProductsData(events);
const userData = new UserData(events);
const basketData = new BasketData(events);
const pageWrapper = document.querySelector('.page__wrapper') as HTMLElement;
// const modal = new Modal(modalContainer, pageWrapper, events);
// const cardsBasket = new CardsBasket(basketTemplate, events);
// const modalWithPayment = new ModalWithPayment(paymentTemplate, events);
// const modalWithForm = new ModalWithForm(formTemplate, events);
// const modalWithSucces = new ModalWithSucces(succesTemplate, events);


//загрузка данных с сервера и рендер карточек
Promise.all([
	api.getProducts()])
	.then(([products]) => {
		productsData.products = products.items;
		const cardsArray = productsData.products.map((card) => {
			const cardInstant = new Card(cardsCatalogTemplate, events);
			cardInstant.setData(card);
			return cardInstant.render();
		});
		const cardsContainer = new CardsCatalog(gallery);
		cardsContainer.render(cardsArray);

	})
	.catch((err) => {
		console.error(err);
	});


