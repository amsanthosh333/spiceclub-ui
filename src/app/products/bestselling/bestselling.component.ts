import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-bestselling',
  templateUrl: './bestselling.component.html',
  styleUrls: ['./bestselling.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class BestsellingComponent implements OnInit {
  p: number = 1;
  Sort = [
    { id: 'price_low_to_high', value: 'price_low_to_high' },
    { id: 'price_high_to_low', value: 'price_high_to_low' },
    { id: 'new_arrival', value: 'new_arrival' },
    { id: 'popularity', value: 'popularity' },
    { id: 'top_rated', value: 'top_rated' },
  ];
  openproduct: any;
  Peoduct: any;
  loadingIndicator: boolean | undefined;
  page1: boolean=true;
  page2: boolean=false;
  page3: boolean=false;
  Bestsellpro: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 0 "," 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  quantityy: any;
  choice: any;
  varprise: any;
  varient_value: any;
  stocck: any;
  searchh: any;
  sortprod: any;
  prodcount=[1,2,3,4,5,6,7,8,9,10];
  prodloader: boolean=true;

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService
    ,private toastr: ToastrService,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
      
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user?.id;
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;
   }

   ngOnInit(): void {
    window.scroll(0,0);
    this.viewfuturedpro();
    
      }
         
    viewfuturedpro(){
      this.request.getbestsellpro().subscribe((response: any) => {
        this.Bestsellpro=response.data;
        this.prodloader=false;
        console.log("best sellling",this.Bestsellpro);  
      });
    }
    viewproductrow(img: any){
      this.openproduct=img.links.details;
      this.product_id=img.id;
    console.log("detail", this.openproduct);
    this.product_id=img.id;
      this.viewrqwproduct();
    } 
    
    viewrqwproduct(){
      var product_id
      this.request.viewfeatproducd(this.openproduct).subscribe((response: any) => {
        // this.data = data;
        // this.filteredData = data;
        this.Peoduct=response.data[0];
         product_id=this.Peoduct.id;
         this.choice=this.Peoduct.choice_options;
         this.stocck=this.Peoduct.current_stock;
        // console.log("topsellis",product_id);
        console.log("response.data",this.Peoduct);
        console.log("choiceoptions",this.Peoduct.choice_options); 
        this.page1=false,
        this.page2=true,
      
        // this.filteredData=data.response;
        setTimeout(() => {
          this.loadingIndicator = false;
        }, 500);
      });
      console.log("topsellis",product_id);
    
    }
    
    firstDropDownChanged(data: any) 
    {
      console.log(data.target.value);
      this.quantityy=data.target.value;
        return this.quantityy= this.quantityy; 
    }
    addtowishlist(prd_id:any){
      let edata4={
        user_id:this.userid,
        product_id:prd_id
      }
      console.log(edata4);  
      this.request.addtowishlist(edata4).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Product is successfully added to your wishlist') {
          console.log("success",res.message); 
          this.addRecordSuccess() ;     
        }
        else  {
          this.toastr.error(res.message);
          console.log("error",res.message);
        }
      }, (error: any) => {
        console.log("error",error);
      });
    }
    addtocart(_id:any){
      let edata={
        id : _id,
        variant:this?.varient_value.replace(/\s/g, ""),
        user_id: this.userid,
        quantity: this.quantityy  
      }
      console.log(edata);  
      this.request.addtocart(edata).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Product added to cart successfully') {  
          this.addRecordSuccess();     
        }
        else if(res.message== 'Minimum 1 item(s) should be ordered'){
          this.toastr.info(res.message);
          console.log("minimum 1");
        } 
        else if(res.message== 'Stock out'){
          this.toastr.error(res.message);
          console.log("Stock out");
        }
        else  {
          console.log("error",res);
        }
      }, (error: any) => {
        console.log("error",error);
      
      });
    }
    selectvar(weight:any){
      this.varient_value=weight
      this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
        console.log(res);
        this.stocck=res?.stock,
        this.varprise=res?.price_string;
        // if (res.message == 'Product added to cart successfully') {       
        // }
        // else  {
        //   console.log("error",res);
    
        // }
      }, (error: any) => {
        console.log("error",error);
      
      });
    }
    oncatChange(val:any){
   
      console.log("value",val);
      this.request.getsortprod(val.value).subscribe((response: any) => {
        this.Bestsellpro=response.data;
        // this.page1=false,
        // this.page2=false,
        // this.page3=true,
        console.log("response",response);
         console.log("allprod",this.Bestsellpro);
     
      });
    }
      filterDatatable(event:any){
  console.log(event.target.value)
  this.searchh=event.target.value
  this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
    this.Bestsellpro=response.data; 
    console.log("response",response);
     console.log("search",this.sortprod);
 
  });

    }
    addRecordSuccess() {
      this.toastr.success('Added Successfully', '');
    }
    editRecordSuccess() {
      this.toastr.success('Edit Record Successfully', '');
    }
    deleteRecordSuccess() {
      this.toastr.error(' Removed Successfully', '');
    }

    
    }
