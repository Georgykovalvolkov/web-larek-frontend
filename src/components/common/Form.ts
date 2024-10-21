import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class ModalWithForm {
	protected submitButton: HTMLButtonElement;
	protected error: HTMLElement;
    protected container: HTMLFormElement;
    protected events: IEvents
	constructor(container: HTMLFormElement, events: IEvents) {
        this.events = events;
        
		const modalActions = ensureElement<HTMLDivElement>(
			'.modal__actions',
			container
		);
		this.submitButton = ensureElement<HTMLButtonElement>(
			'.button',
			modalActions
		);
		this.error = ensureElement<HTMLElement>('.form__errors', modalActions);
		container.addEventListener('submit', (event: InputEvent) => {
			event.preventDefault();
			this.events.emit('formOrder:submit', { formOrder: this });
		});
	}

	protected showInputError(): void {
		this.error.textContent = 'Заполните поля';
		this.submitButton.disabled = true;
	}
	protected hideInputError(): void {
		this.error.textContent = '';
		this.submitButton.disabled = false;
	}
	render(): HTMLFormElement {
		return this.container;
	}
}