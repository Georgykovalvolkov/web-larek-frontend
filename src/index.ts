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
import { ensureElement } from './utils/utils';

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
const modal = new Modal(modalContainer, pageWrapper, events);
const cardsBasket = new CardsBasket(basketTemplate, events);
const modalWithPayment = new ModalWithPayment(paymentTemplate, events);
const modalWithForm = new ModalWithForm(formTemplate, events);
const modalWithSucces = new ModalWithSucces(succesTemplate, events);



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

//навешиваем слушатель на кнопку открытия корзины
basket.addEventListener('click', () => {
	events.emit('basket:open');
});

//отрисовка корзины

events.on('basket:render', () => {
	const cardsArray = basketData.products.map((card) => {
		const cardInstant = new Card(cardBasketTemplate, events);
		cardInstant.setData(card);
		return cardInstant.render();
	});
	modal.render(cardsBasket.render(cardsArray, basketData.total));
});

//открытие корзины

events.on('basket:open', () => {
	events.emit('basket:render');
	modal.open();
});

//подсчет количества товаров в корзине
events.on('basket:changed', () => {
	basketCounter.textContent = String(basketData.products.length);
});

//отрисовка превью карточки

events.on('preview:render', (card: Card) => {
	const cardPreview = new Card(cardPreviewTemplate, events);
	cardPreview.setAndCheck(productsData.getProduct(card._id), basketData.checkProduct(card._id));
	modal.render(cardPreview.render());
});

//открыть карточку продукта
events.on('product:preview', (data: { card: Card }) => {
	const { card } = data;
	events.emit('preview:render', card);
	modal.open();
});

//добавление покупки в корзину
events.on('product:add', (data: { card: Card }) => {
	const { card } = data;
	basketData.addProduct(productsData.getProduct(card._id));
	card.checkInBasket(true);
});

//удаление покупки из корзины
events.on('product:delete', (data: { card: Card, basket: boolean }) => {
	const { card, basket } = data;
	basketData.deleteProduct(card._id);
	if (basket) {events.emit('basket:render');
	} else {card.checkInBasket(false);
	}
});

//оформить заказ (оплата и адрес доставки)
events.on('basketButton:click', () => {
	modal.render(modalWithPayment.render());
});

events.on('formOrder:submit', (data: { formOrder: ModalWithPayment }) => {
	const { formOrder } = data;
	const dataForm = formOrder.getValues();
	if (dataForm.formName === 'order') {
		userData.setPaymentAndDelivery(dataForm);

		modal.render(modalWithForm.render());
	} else {
		userData.setContactInfo(dataForm);
		events.emit('dataOrder:post');
	}
});





