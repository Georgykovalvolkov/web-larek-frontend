import { IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { IEvents } from "./base/events";

export class Card {
    protected cardId: string;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected cardCategory: HTMLElement;
    protected cardCategorySelector: string;
    protected cardText: HTMLElement;
    protected addBasketButton: HTMLButtonElement;
    protected removeBasketButton: HTMLButtonElement;
    protected index: HTMLElement;
    protected events: IEvents;

    constructor(protected container: HTMLTemplateElement, events: IEvents) {
        this.events = events;

        this.cardTitle = this.container.querySelector('.card__title');
        this.cardImage = this.container.querySelector('.card__image');
        this.cardPrice = this.container.querySelector('.card__price');
        this.cardCategory = this.container.querySelector('.card__category');
        this.cardText = this.container.querySelector('.card__text');
        this.addBasketButton = this.container.querySelector('.button');
        this.removeBasketButton = this.container.querySelector('.basket__item-delete');
        this.index = this.container.querySelector('.basket__item-index');

        if (this.container.classList.contains('gallery__item')) {
			this.container.addEventListener('click', () =>
				this.events.emit('product:add', { card: this })
			);
		}

		if (this.removeBasketButton) {
			this.removeBasketButton.addEventListener('click', () =>
				this.events.emit('product:delete', { card: this, basket: true })
			)
		}
}

    checkInBasket(inBasket: boolean): void {
		if (this.addBasketButton) {
			if (inBasket) {
				this.addBasketButton.textContent = 'Удалить из корзины';
				this.addBasketButton.addEventListener('click', () =>
					this.events.emit('product:delete', { card: this, basket: false })
				);
			} else {
				this.addBasketButton.textContent = 'В корзину';
				this.addBasketButton.addEventListener('click', () =>
					this.events.emit('product:add', { card: this })
				);
			}
		}
	}

    setData(cardData: IProduct): void {
		this.cardId = cardData.id;
		if (this.cardImage) {
			this.cardImage.src = CDN_URL + cardData.image;
		}
		if (this.cardCategory) {
			switch (cardData.category) {
				case 'софт-скил':
					this.cardCategorySelector = 'card__category_soft';
					break;
				case 'другое':
					this.cardCategorySelector = 'card__category_other';
					break;
				case 'дополнительное':
					this.cardCategorySelector = 'card__category_additional';
					break;
				case 'хард-скил':
					this.cardCategorySelector = 'card__category_hard';
					break;
				case 'кнопка':
					this.cardCategorySelector = 'card__category_button';
					break;
			}
			this.cardCategory.classList.remove('card__category_soft');
			this.cardCategory.classList.add(this.cardCategorySelector);
			this.cardCategory.textContent = cardData.category;
		}
		this.cardTitle.textContent = cardData.title;
		if (this.cardText) {
			this.cardText.textContent = cardData.description;
		}
		if (cardData.price !== null) {
			this.cardPrice.textContent = String(cardData.price + ' синапсов');
		} else if (cardData.price === null) {
			if (this.addBasketButton) {
				this.addBasketButton.disabled = true;
			}
			this.cardPrice.textContent = 'Бесценно';
		}
	}

    setAndCheck(cardData: IProduct, inBasket: boolean): void {
		this.setData(cardData);
		this.checkInBasket(inBasket);
	}

	render(): HTMLTemplateElement {
		return this.container;
	}

	get _id(): string {
		return this.cardId;
	}

}