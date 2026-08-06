

interface Coupon{

    id:string;

    code:string;

    discount:number;

}

export interface IOrderSummary {

    subtotal:number;

    total:number;

    coupons:Coupon[];

}