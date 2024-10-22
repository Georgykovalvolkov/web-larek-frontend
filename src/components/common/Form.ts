import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { cloneTemplate } from '../../utils/utils';

export class Form {
	protected submitButton: HTMLButtonElement;
	protected inputError: HTMLElement;
    protected container: HTMLFormElement;
    protected events: IEvents
	constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
        this.container = cloneTemplate(template)

		const modalActions = ensureElement<HTMLDivElement>(
			'.modal__actions',
			this.container
		);
		this.submitButton = ensureElement<HTMLButtonElement>(
			'.button',
			modalActions
		);
		this.inputError = ensureElement<HTMLElement>('.form__errors', modalActions);
		this.container.addEventListener('submit', (event: InputEvent) => {
			event.preventDefault();
			this.events.emit('formOrder:submit', { formOrder: this });
		});
	}

	showInputError(): void {
		this.inputError.textContent = 'Заполните пустые поля';
		this.submitButton.disabled = true;
	}
	hideInputError(): void {
		this.inputError.textContent = '';
		this.submitButton.disabled = false;
	}
	render(): HTMLFormElement {
		return this.container;
	}
}