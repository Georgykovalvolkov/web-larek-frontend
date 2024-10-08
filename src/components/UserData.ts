import {IUSerData, TPayMethod, TUserData, TPayData, TEmailData } from "../types";
import { IEvents } from "./base/events";

export class UserData implements IUSerData {
    private payMethod: TPayMethod;
    private address: string;
    private email: string;
    private phone: string;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setPaymentAndDelivery(form: TPayData): void {
        this.payMethod = form.payMethod as TPayMethod;
        this.address = form.address;
        this.events.emit('addres:submit');
    }

    setContactInfo(form: TEmailData): void {
        this.email = form.email;
        this.phone = form.phone;
        this.events.emit('contact:submit');
    }

    clearData(): void {
		this.payMethod = null;
		this.address = '';
		this.email = '';
		this.phone = '';
	}

    getUserData(): TUserData {
        const UserData: TUserData = {
			payMethod: this.payMethod,
			address: this.address,
			email: this.email,
			phone: this.phone,
		}
		return UserData
    }
   
}
