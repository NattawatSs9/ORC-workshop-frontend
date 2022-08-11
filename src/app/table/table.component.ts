import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { OrderService } from '../services/order.service';
import { Order } from '../types/Order';
import { Company } from '../types/Company'
import { site } from '../types/Site';
import { SiteService } from '../services/site.service';
import { PlantService } from '../services/plant.service';
import { plant } from '../types/Plant';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  searchText = "";
  orders$: Observable<Order[]> | undefined
  staticOrder : Order[] | undefined;
  loading:boolean = false;
  list: Order[] = [];
  currentList : Order[] = []
  // Page Start at 0
  currentPage: number = 0;
  numberOfLastPage: number = 0;
  companyList?: Company[];
  siteList? : site[];
  plantList? : plant[]
  companySelected : number = 0;
  siteSelected : number = 0;
  plantSelected : number = 0;
  statusSelected: string = "";
  

  constructor(private orderService: OrderService, private companyService : CompanyService,
    private siteService : SiteService, private plantService : PlantService) { 
  }
  isToggleFilter : boolean = false;

  ngOnInit(): void {
    this.fetch();
  }
  
  setNumberOfLastPage () {
    this.numberOfLastPage = Math.ceil(this.list.length / 20)
  }

  setCurrentList() {
    let newList : Order[] = [...this.list]
    this.currentList = newList.slice(this.currentPage * 20, (this.currentPage+1)*20)

  }

  nextPage() {
    if ((this.currentPage + 1) == this.numberOfLastPage) return;
    this.currentPage += 1;
    this.setCurrentList();
  }
  
  previousPage() {
    if (this.currentPage + 1 == 1) return;
    this.currentPage -= 1;
    this.setCurrentList();
  }

  setToLastPage() {
    this.currentPage = this.numberOfLastPage - 1;
    this.setCurrentList();
  }

  setToFirstPage () {
    this.currentPage = 1 - 1;
    this.setCurrentList();
  }
  getStyleStatus(status : string) {
    if (status == "Draft") return "draft-status"
    if (status == "Submit") return "submit-status"
    if (status == "Cancel") return "cancel-status"
    if (status == "CustomerConfirm") return "confirm-status"
    else return ""
  }
  getWord(status : string) {
    let newStatus : string = "";
    const result : string[] = status.split(/(?=[A-Z])/);
    if (result.length == 1) return status
    for (let word of result ){
      newStatus += word;
      newStatus += " ";
    }
    return newStatus.trim();
  }
  openStatusModal (order : Order) {
    order.toggle = !order.toggle;
  }
  toggleFilter() {
    this.isToggleFilter = !this.isToggleFilter;
  }
  fetch() {
    this.companySelected = 0
    this.siteSelected = 0
    this.plantSelected = 0
    this.currentList = [];
    this.list = [];
    this.orders$ = this.orderService.getAllOrder();
    this.orders$.subscribe(data => {
      this.list = data
      this.staticOrder = data
      this.numberOfLastPage = Math.ceil(this.list.length / 20)
      this.setCurrentList();
      this.getAllCompany();
      this.getAllPlant();
    })
  }
  searchItem() {
    if (this.searchText == "") {
      this.list = this.staticOrder as Order[]
    }
    else {
      this.list = this.list.filter((item) => item.contact_name.includes(this.searchText))
    }
    if (this.companySelected != 0) this.list = this.list.filter((item) => item.company_id == this.companySelected)
    if (this.siteSelected != 0) this.list = this.list.filter((item) => item.site_id == this.siteSelected)
    if (this.plantSelected != 0) this.list = this.list.filter((item) => parseInt(item.plant_id) == this.plantSelected)
    if (this.statusSelected != '') this.list = this.list.filter((item) => item.status.toLowerCase() == this.statusSelected.toLowerCase())
    this.setNumberOfLastPage()
    this.setCurrentList()
  }
  getAllCompany() {
    this.companyService.getCompany().subscribe(data => {
      this.companyList = data
    })
  }
  getAllSite(company_id : number) {
    this.siteService.getAll(company_id).subscribe(data => {
      this.siteList = data
    })
  }
  getAllPlant() {
    this.plantService.getAll().subscribe(data => {
      this.plantList = data
    })
  }
  companySelect() {
    this.getAllSite(this.companySelected)
    this.searchItem()
  }
  statusSelect() {
    this.searchItem()
  }
}
