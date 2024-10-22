import { Form } from './common/Form';
import { IEvents } from './base/events';
import { TPayMethod } from '../types';
import { ensureElement } from '../utils/utils';
import { cloneTemplate } from '../utils/utils';

export class ModalWithPayment extends Form {
	protected input: HTMLInputElement;
	protected payment: TPayMethod;
    protected container: HTMLFormElement;
    protected events: IEvents
    
	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events);
		this.container = cloneTemplate(template)

		this.input = ensureElement<HTMLInputElement>('[name="address"]', this.container);
		this.getValid(true);
		const cashButton = ensureElement<HTMLButtonElement>(
			'[name="cash"]',
			this.container
		);
		const cardButton = ensureElement<HTMLButtonElement>(
			'[name="card"]',
			this.container
		);
		cashButton.addEventListener('click', () => {
			this.getValid(false);
			this.payment = 'cash';
			cashButton.classList.add('button_alt-active');
			cardButton.classList.remove('button_alt-active');
		});
		cardButton.addEventListener('click', () => {
			this.getValid(false);
			this.payment = 'card';
			cardButton.classList.add('button_alt-active');
			cashButton.classList.remove('button_alt-active');
		});
	}

	getValid(isValid = false): void {
		this.input.disabled = isValid;
		this.input.addEventListener('input', () => {
			if (this.input.value === '') {
				this.showInputError();
			} else {
				this.hideInputError();
			}
		});
	}

	getValues(): Record<string, string> {
		const valuesObject: Record<string, string> = {};
		valuesObject['address'] = this.input.value;
		valuesObject['formName'] = this.container.name;
		valuesObject['payment'] = this.payment;
		return valuesObject;
	}
}