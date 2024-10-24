import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class ModalWithSucces {
	protected submitButton: HTMLButtonElement;
	protected description: HTMLElement;
  protected events: IEvents

	constructor(protected content: HTMLElement, events: IEvents) {
    this.events = events;

		this.submitButton = ensureElement<HTMLButtonElement>('.order-success__close',content);
		this.description = ensureElement<HTMLElement>('.order-success__description',content);
		this.submitButton.addEventListener('click', () => {this.events.emit('modalSuccess:close');});
	}

	render(total: number): HTMLElement {
		this.description.textContent = `Списано ${total} синапсов`;
		return this.content;
	}
}