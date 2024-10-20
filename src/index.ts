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



const events = new EventEmitter();
const productsData = new ProductsData(events);
const userData = new UserData(events);
const basketData = new BasketData(events);

// const testProducts = [
    // {
    //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    //     "description": "Если планируете решать задачи в тренажёре, берите два.",
    //     "image": "/5_Dots.svg",
    //     "title": "+1 час в сутках",
    //     "category": "софт-скил",
    //     "price": 750
    // },
    // {
    //     "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
    //     "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
    //     "image": "/Shell.svg",
    //     "title": "HEX-леденец",
    //     "category": "другое",
    //     "price": 1450
    // },
    // {
    //     "id": "b06cde61-912f-4663-9751-09956c0eed67",
    //     "description": "Будет стоять над душой и не давать прокрастинировать.",
    //     "image": "/Asterisk_2.svg",
    //     "title": "Мамка-таймер",
    //     "category": "софт-скил",
    //     "price": null
    // },
    // {
    //     "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
    //     "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
    //     "image": "/Soft_Flower.svg",
    //     "title": "Фреймворк куки судьбы",
    //     "category": "дополнительное",
    //     "price": 2500
    // },
    // {
    //     "id": "1c521d84-c48d-48fa-8cfb-9d911fa515fd",
    //     "description": "Если орёт кот, нажмите кнопку.",
    //     "image": "/mute-cat.svg",
    //     "title": "Кнопка «Замьютить кота»",
    //     "category": "кнопка",
    //     "price": 2000
    // },
    // {
    //     "id": "f3867296-45c7-4603-bd34-29cea3a061d5",
    //     "description": "Чтобы научиться правильно называть модификаторы, без этого не обойтись.",
    //     "image": "Pill.svg",
    //     "title": "БЭМ-пилюлька",
    //     "category": "другое",
    //     "price": 1500
    // },
    // {
    //     "id": "54df7dcb-1213-4b3c-ab61-92ed5f845535",
    //     "description": "Измените локацию для поиска работы.",
    //     "image": "/Polygon.svg",
    //     "title": "Портативный телепорт",
    //     "category": "другое",
    //     "price": 100000
    // },
    // {
    //     "id": "6a834fb8-350a-440c-ab55-d0e9b959b6e3",
    //     "description": "Даст время для изучения React, ООП и бэкенда",
    //     "image": "/Butterfly.svg",
    //     "title": "Микровселенная в кармане",
    //     "category": "другое",
    //     "price": 750
    // },
    // {
    //     "id": "48e86fc0-ca99-4e13-b164-b98d65928b53",
    //     "description": "Очень полезный навык для фронтендера. Без шуток.",
    //     "image": "Leaf.svg",
    //     "title": "UI/UX-карандаш",
    //     "category": "хард-скил",
    //     "price": 10000
    // },
    // {
    //     "id": "90973ae5-285c-4b6f-a6d0-65d1d760b102",
    //     "description": "Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.",
    //     "image": "/Mithosis.svg",
    //     "title": "Бэкенд-антистресс",
    //     "category": "другое",
    //     "price": 1000
    // }
// ];

//тестирование productsData
// console.log(productsData.products = testProducts); //тестируем сеттер продуктов
// console.log(productsData.products); //тестируем геттер продуктов
// console.log(productsData.getProduct('b06cde61-912f-4663-9751-09956c0eed67')); //тестируем метод getProduct - получение продукта по id
// console.log(productsData.getProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));

// const testUserPay = {
    // payment: 'card' as TPayMethod, 
    // address: 'Москва'
// };

// const testUserEmail = {
//     email: 'L8Z2A@example.com',
//     phone: '88005553535'
// };

// console.log(userData.setPaymentAndDelivery(testUserPay)); //тестируем сеттер оплаты и доставки
// console.log(userData.setContactInfo(testUserEmail)); //тестируем сеттер контактной информации
// console.log(userData.getUserData()); //тестируем геттер пользователя
// console.log(userData.clearData()); //тестируем сеттер пользователя





// basketData.addProduct(product1); //тестируем метод добавления продукта в корзину
// console.log(basketData.products); //тестируем геттер корзины
// basketData.addProduct(product2); //тестируем метод добавления продукта в корзину
// console.log(basketData.products); //тестируем геттер корзины
// console.log(basketData.total); //тестируем геттер суммы корзины
// console.log(basketData.checkProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')); //тестируем метод проверки наличия продукта в корзине
// console.log(basketData.deleteProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')); //тестируем метод удаления продукта из корзины
// console.log(basketData.products); //тестируем геттер корзины
// console.log(basketData.total); //тестируем геттер суммы корзины
// basketData.addProduct(product2); //тестируем метод добавления продукта в корзину
// console.log(basketData.products); //тестируем геттер корзины
// console.log(basketData.clearBasket()); //тестируем метод очистки корзины
// console.log(basketData.products); //тестируем геттер корзины
// console.log(basketData.total); //тестируем геттер суммы корзины

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const testOrder = {
    "payment": "card" as TPayMethod,
    "email": "L8Z2A@example.com",
    "phone": "88005553535",
    "address": "Москва",
    "total": 3250,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "412bcf81-7e75-4e70-bdb9-d3c73c9803b7"
    ]
}

const tesrId = '854cef69-976d-4c2a-a18c-2aa45046c390';
const tesrId2 = 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9';

Promise.all([api.getProducts(), api.getProduct(tesrId2), api.postOrder(testOrder)])
    .then(([products, product, order]) => {
        productsData.products = products;
        console.log(products);
        basketData.addProduct(product);
        console.log(basketData.products);
        console.log(order);
    })
    .catch((err) => {
        console.error(err);
    })
    const product1 = {
        "id": "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
        "description": "Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.",
        "image": "/Shell.svg",
        "title": "HEX-леденец",
        "category": "другое",
        "price": 1450
     };

     const product2 = {
     "id": "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
    "description": "Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.",
    "image": "/Soft_Flower.svg",
    "title": "Фреймворк куки судьбы",
    "category": "дополнительное",
     "price": 2500
 };

 const product3: IProduct = {
         "id": "b06cde61-912f-4663-9751-09956c0eed67",
         "description": "Будет стоять над душой и не давать прокрастинировать.",
         "image": "/Asterisk_2.svg",
         "title": "Мамка-таймер",
         "category": "софт-скил",
         "price": null
};

    const testSection = document.querySelector('.gallery') as HTMLElement;
    const cardTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
    
    const card = new Card(cardTemplate, events); //создаем экземпляр карточки
    const card2 = new Card(cardTemplate, events); //создаем ещё одну карточку
    const card3 = new Card(cardTemplate, events); //создаем ещё одну карточку

    const cardsCatalog = new CardsCatalog(testSection); //создаем экземпляр каталога карточек
      

    card.setData(product1); //даем карточке данные
    card2.setData(product2);
  

    const cardArray = [];

    cardArray.push(card.render()); //рендерим карточку
    cardArray.push(card2.render());
   

    basketData.addProduct(product1);
    basketData.addProduct(product2);

    const total = basketData.total;

    const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;
    const basket = new CardsBasket(basketTemplate, events);

    testSection.appendChild(basket.render(cardArray, total));

    // cardsCatalog.render(cardArray);
    


    // const valid1 = true;
    // const valid2 = false;

    // card.checkInBasket(valid2);
    // card.setAndCheck(product3, valid2);

    events.onAll((event) => {
        console.log(event);
    });

    

