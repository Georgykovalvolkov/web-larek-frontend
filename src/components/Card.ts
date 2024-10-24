import { IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { IEvents } from "./base/events";
import { cloneTemplate } from "../utils/utils";

export class Card {
	protected element: HTMLElement;
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

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
		this.element = cloneTemplate(template);

        this.cardTitle = this.element.querySelector('.card__title');
        this.cardImage = this.element.querySelector('.card__image');
        this.cardPrice = this.element.querySelector('.card__price');
        this.cardCategory = this.element.querySelector('.card__category');
        this.cardText = this.element.querySelector('.card__text');
        this.addBasketButton = this.element.querySelector('.button');
        this.removeBasketButton = this.element.querySelector('.basket__item-delete');
        this.index = this.element.querySelector('.basket__item-index');

        if (this.element.classList.contains('gallery__item')) {
			this.element.addEventListener('click', () => {
				this.events.emit('product:preview', { card: this });
			});
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

	render() {
		return this.element;
	}

	get _id(): string {
		return this.cardId;
	}

}