import {IUSerData, TPayMethod, TUserData } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUSerData {
    private payment: TPayMethod;
    private address: string;
    private email: string;
    private phone: string;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setPaymentAndDelivery(form: Record<string, string>): void {
        this.payment = form.payment as TPayMethod;
        this.address = form.address;
        this.events.emit('addres:submit');
    }

    setContactInfo(form: Record<string, string>): void {
        this.email = form.email;
        this.phone = form.phone;
        this.events.emit('contact:submit');
    }

    clearData(): void {
		this.payment = null;
		this.address = '';
		this.email = '';
		this.phone = '';
	}

    getUserData(): TUserData {
        const UserData: TUserData = {
			payment: this.payment,
			address: this.address,
			email: this.email,
			phone: this.phone,
		}
		return UserData
    }
   
}
