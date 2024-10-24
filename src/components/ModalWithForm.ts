import { Form } from './common/Form';
import { IEvents } from './base/events';


export class ModalWithForm extends Form {
	protected inputs: NodeListOf<HTMLInputElement>;

	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.inputs = container.querySelectorAll('.form__input');
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