export class CardsCatalog {
	constructor(protected catalog: HTMLElement) {}

	render(cards: HTMLElement[]) {
		cards.forEach((card) => this.catalog.appendChild(card));
	}
}