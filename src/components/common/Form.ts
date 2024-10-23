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

		const modalActions = ensureElement<HTMLDivElement>('.modal__actions',this.container);
		console.log(modalActions)
		this.submitButton = ensureElement<HTMLButtonElement>('.button',modalActions);
		console.log(this.submitButton)
		this.inputError = ensureElement<HTMLElement>('.form__errors', modalActions);
		console.log(this.inputError)
		this.container.addEventListener('submit', (event: InputEvent) => {
			event.preventDefault();
			this.events.emit('formOrder:submit', { formOrder: this });
		});
	}

	showInputError(): void {
		console.log('Ошибка: пустое поле')
		this.inputError.textContent = 'Заполните пустые поля';
		this.submitButton.disabled = true;
	}
	hideInputError(): void {
		console.log('Ошибок нет')
		this.inputError.textContent = '';
		this.submitButton.disabled = false;
	}
	render(): HTMLFormElement {
		return this.container;
	}
}