import { Form } from './common/Form';
import { IEvents } from './base/events';
import { cloneTemplate } from '../utils/utils';


export class ModalWithForm extends Form {
	protected inputs: NodeListOf<HTMLInputElement>;
    protected container: HTMLFormElement; 
    protected events: IEvents
	constructor(template: HTMLTemplateElement, events: IEvents) {
		super(template, events);
		this.container = cloneTemplate(template)

		this.inputs = this.container.querySelectorAll('.form__input');
		this.getValid();
	}
	protected getValid(): void {
		this.inputs.forEach((input) => {
			input.addEventListener('input', () => {
				for (const input of this.inputs) {
					if (input.value === '') {
						this.showInputError();
						break;
					} else {
						this.hideInputError();
					}
				}
			});
		});
	}

	getValues(): Record<string, string> {
		const valuesObject: Record<string, string> = {};
		this.inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		valuesObject['formName'] = this.container.name;
		return valuesObject;
	}
}