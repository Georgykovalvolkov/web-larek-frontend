import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';

export class Modal {
	protected closeButton: HTMLButtonElement;
	protected content: HTMLElement;
    protected container: HTMLElement;
    protected events: IEvents;
    protected page: HTMLElement;
    
	constructor(container: HTMLElement, page: HTMLElement, events: IEvents) {
        this.events = events;
        this.page = page;
	
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this.content = ensureElement<HTMLElement>('.modal__content', container);
		this.closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('mousedown', (evt) => {
			if (evt.target === evt.currentTarget) {
				this.close();
			}
		});
		this.handleEscUp = this.handleEscUp.bind(this);
	}

	open(): void {
		this.container.classList.add('modal_active');
        this.page.classList.add('page__wrapper_locked');
		this.events.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.content.innerHTML = '';
		this.events.emit('modal:close');
        this.page.classList.remove('page__wrapper_locked');
		document.removeEventListener('keyup', this.handleEscUp);
	}

	render(data: HTMLElement): void {
		this.content.innerHTML = '';
		this.content.append(data);
		document.addEventListener('keyup', this.handleEscUp);
	}
	handleEscUp(evt: KeyboardEvent): void {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}