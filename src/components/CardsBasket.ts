import { ensureElement, cloneTemplate } from '../utils/utils';
import { IEvents } from './base/events';

export class CardsBasket {
    protected element: HTMLElement;
    protected events: IEvents;
	protected basketButton: HTMLButtonElement;
    protected content: HTMLElement;
	protected basketPrice: HTMLSpanElement;

	constructor(protected template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
		this.element = cloneTemplate(template);

		this.content = ensureElement<HTMLElement>('.basket__list', this.element);
		this.basketButton = ensureElement<HTMLButtonElement>(
			'.basket__button', this.element);
		this.basketPrice = ensureElement<HTMLSpanElement>(
            '.basket__price',this.element);

		this.basketButton.addEventListener('click', () => {
			this.events.emit('basketButton:click');
		});
	}

	render(data: HTMLElement[], total: number): HTMLElement {
		this.content.innerHTML = '';
		this.basketPrice.textContent = String(total) + ' синапсов';

		if (data.length === 0) {
			this.basketButton.disabled = true;
			return this.element;
		} else {
			this.basketButton.disabled = false;
		}

		let count = 1;
		data.forEach((card) => {
			const index = card.querySelector('.basket__item-index');
			index.textContent = String(count++);
			this.content.append(card);
		});

		return this.element;
	}
}