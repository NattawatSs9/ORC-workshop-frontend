export type Order = {
    booking_id: number,
    booking_code: string,
    quotation_id: number,
    quotation_name: string,
    delivery_datetime: string,
    delivery_date: string,
    company_id: number,
    company_name: string,
    site_id: number,
    site_name: string,
    plant_id: string,
    plant_name: string,
    product_id: number,
    product_name: string,
    quantity: number,
    contact_name:string,
    tel: string,
    casting_method: string,
    status: string,
    cancel_message: string | null,
    toggle: boolean,
    qc: number
}

export type Max = {
    max: number
}

export type AddOrder = {
    deliveryDateTime: string,
    deliveryDate: string,
    castingMethod: string,
    tel: string,
    contactName: string,
    quantity: number,
    bookingCode: string,
    moreDetail: string,
    companyId: number,
    productId: number,
    plantId: number,
    siteId: number,
    quotation: number,
    qc: number,
  }