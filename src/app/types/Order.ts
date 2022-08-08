export type Order = {
    booking_id: number,
    booking_code: string,
    quotation_name: string,
    delivery_datetime: string,
    delivery_date: string,
    company_name: string,
    site_name: string,
    plant_name: string,
    product_name: string,
    quantity: number,
    contact_name:string,
    tel: string,
    casting_method: string,
    status: string,
    cancel_message: string | null,
    toggle: boolean
}