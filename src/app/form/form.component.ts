import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { OrderService } from '../services/order.service';
import { PlantService } from '../services/plant.service';
import { ProductService } from '../services/product.service';
import { QuotationService } from '../services/quotation.service';
import { SiteService } from '../services/site.service';
import { Company } from '../types/Company';
import { AddOrder, Max, Order } from '../types/Order';
import { plant } from '../types/Plant';
import { product } from '../types/Product';
import { quotation } from '../types/Quotation';
import { site } from '../types/Site';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  error: string = "";
  responseAddForm : string | undefined;
  toggleModal: boolean = false;
  hours : number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
  mins: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]
  toggleBookingCode : string = ""
  max$ : Observable<Max[]> = this.orderService.getNextNumber();
  nextNumber: number = 0;
  companies?: Company[];
  companies$ : Observable<Company[]> = this.companyService.getCompany()
  sites? : site[] 
  quotations? : quotation[]
  products? : product[]
  plants? : plant[]

  newBookingCode: string = "";
  newCompany : number = 0;
  newSite: number = 0;
  newQuotation: number = 0;
  newProduct: number = 0;
  newPlant: number = 0;
  newContact: string = "";
  newTel: string = "";
  newDate: Date = new Date();
  newHour: number = 1;
  newMin: number = 0;
  newPeriod: string = "AM"
  newQuantity: number= 0;
  newCastingMathod: string = "";
  newMore: string = "";
  qcToggle : boolean = true;
  newQCToggle: number = 1;
  constructor(private companyService : CompanyService, private orderService : OrderService, private siteService : SiteService, private quotationService: QuotationService, private productService: ProductService, private plantService : PlantService, private router : Router ) { }

  ngOnInit(): void {
    this.getNextBookingNumber();
    this.getAllCompany();
    this.getAllPlant();
  }

  getAllCompany() {
    this.companies$.subscribe(data => {
      this.companies = data;
      this.getAllSite();
      
    })
  }

  getNextBookingNumber() {
    this.max$.subscribe(data => {
      this.nextNumber = data[0].max + 1;
        this.newBookingCode = 'B-'+this.nextNumber.toString();
    })
  }

  getAllSite() {
    this.siteService.getAll(this.newCompany).subscribe(data => {
      this.sites = data
      this.getAllQuotation()
    })
  }
  getAllQuotation() {
    this.quotationService.getAll(this.newSite).subscribe(data => {
      this.quotations = data
      this.getAllProduct();
    })
  }
  getAllProduct() {
    this.productService.getAll(this.newQuotation).subscribe(data => {
      this.products = data
      console.log(this.products)
    })
  }
  changeCompany() {
    this.newSite = 0;
    this.getAllSite()
  }
  changeSite() {
    this.newQuotation = 0
    this.getAllQuotation();
  }
  changeQuotation() {
    this.newProduct = 0
    this.getAllProduct()
  }
  getAllPlant() {
    this.plantService.getAll().subscribe(data => {
      this.plants = data
      console.log(this.plants)
    })
  }
  addOrder() {
    if (this.newBookingCode == "" || this.newCompany == 0 
    || this.newSite == 0 || this.newQuotation == 0 || this.newProduct == 0 || this.newQuantity == 0
    || this.newContact == "" || this.newTel == "") {
      alert("You need to fill all of input");
      return
    }
    this.toggleModal = !this.toggleModal
    let addBooking : AddOrder;
    if (this.qcToggle == true) {
      addBooking = {
        deliveryDateTime: this.newHour+":"+this.newMin+" "+this.newPeriod,
        deliveryDate: this.newDate.toString(),
        castingMethod: this.newCastingMathod,
        tel: this.newTel,
        contactName: this.newContact,
        quantity: this.newQuantity,
        bookingCode: this.newBookingCode,
        moreDetail: this.newMore,
        companyId: this.newCompany,
        productId: this.newProduct,
        plantId: this.newPlant,
        siteId: this.newSite,
        quotation: this.newQuotation,
        qc: this.newQCToggle
      }
    }
    else {
      addBooking = {
        deliveryDateTime: this.newHour+":"+this.newMin+" "+this.newPeriod,
        deliveryDate: this.convertDate(this.newDate),
        castingMethod: this.newCastingMathod,
        tel: this.newTel,
        contactName: this.newContact,
        quantity: this.newQuantity,
        bookingCode: this.newBookingCode,
        moreDetail: this.newMore,
        companyId: this.newCompany,
        productId: this.newProduct,
        plantId: this.newPlant,
        siteId: this.newSite,
        quotation: this.newQuotation,
        qc: 0
      }
    }
    this.orderService.addOrder(addBooking).subscribe(
      data => {
        this.responseAddForm = data
      },
      err => {
        this.error = err.message as string
      },
      () => {
        console.log("Finish Process")
      })
  }
  toggleModalExit() {
    this.toggleModal = !this.toggleModal;
    if (this.error) {
      this.error = ""
      return;
    }
    this.router.navigate([`/`]);
  }
  convertDate(date: Date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
  }

}
