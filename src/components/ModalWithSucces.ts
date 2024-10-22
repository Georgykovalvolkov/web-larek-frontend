import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { cloneTemplate } from '../utils/utils';

export class ModalWithSucces {
	protected submitButton: HTMLButtonElement;
	protected description: HTMLElement;
    protected content: HTMLElement;
    protected events: IEvents

	constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
		this.content = cloneTemplate(template)
        
		this.submitButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.content
		);
		this.description = ensureElement<HTMLElement>(
			'.order-success__description',
			this.content
		);
		this.submitButton.addEventListener('click', () => {
			this.events.emit('modalSuccess:close');
		});
	}

	render(total: number): HTMLElement {
		this.description.textContent = `Списано ${total} синапсов`;
		return this.content;
	}
}