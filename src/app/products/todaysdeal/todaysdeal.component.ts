import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import{ SharedService} from 'src/app/services/shared.service'
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-todaysdeal',
  templateUrl: './todaysdeal.component.html',
  styleUrls: ['./todaysdeal.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class TodaysdealComponent implements OnInit {

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
  prodcount=[1,2,3,4,5,6,7,8,9,10,11,12];
  prodloader: boolean=true;
  Daydealpro: any;
  Monthdealpro: any;
  poploader: boolean=true;
  Product: any;
  pagenation: any;
  pagess: any;
  imgloader: boolean=false;
  quantityyy!: number;
  prod_price: any;
  stk: any;
  tags: any;
  colors: any;
  photoos: any;
  totalprice: any;
  buyertypeid: any;
  likedd=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  likeddd=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
  stocckkk: any;
  subItemm: any=0;
  Productt: any;
  storked_pricee: any;
  public quantityarray: any[] = [];
  totalqty: any;
  selectedvar: any;
  showaddbtn: any;
  pagenum: number = 1;
  pageload: boolean = true;
  sidepoploader: boolean = false;
  newpageProduct: any;
  prodloadermain: boolean=true;
  pagee: any= 1;
  currentpackagevalue: any;
  edata:any;

 
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService
    ,private toastr: ToastrService,config: NgbRatingConfig,private modalService: NgbModal,
    private sharedService: SharedService) {

      config.max = 5;
      config.readonly = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')   
    );

    // console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user?.id;
     this.buyertypeid=this.currentdetail.user?.buyertypeid;
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;

     if(this.userid==undefined){
      this.userid=0;
     }
   }

  ngOnInit(): void {
    window.scroll(0,0);
    this. viewdaydeal();
    this.viewmonthdeal();
    this. viewtodaysdeal()
  
  }
  toggle(img:any,index:any): void {
    this.likeddd[index] = !this.likeddd[index];   
    if(this.likeddd[index]==true){
      this.addtowishlist(img.id);
    }
    else if( this.likeddd[index]==false){
      this.deleteRecord(img.id);
    }
  
  }
  toggledelete(img: any, index: any): void {
    if (this.userid !== 0) {
      this.likedd[index] = !this.likedd[index];
    if (this.likedd[index] == true) {
      this.addtowishlist(img.id);
    }
    else if (this.likedd[index] == false) {
      this.deleteRecord(img.id);
    }
    }
    else {
      this. openlogin()
    }
    
  }
  openlogin() {
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  viewdaydeal(){
    // this.prodloader=true;
    // this.imgloader = false;
    this.request.getdaydealpro('').subscribe((response: any) => {
      this.Daydealpro=response.data.slice(0, 3);
      this.prodloader=false;  
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    });
  }
  viewmonthdeal(){
    // this.prodloader=true;
    // this.imgloader = false;
    this.request.getmonthdealpro('').subscribe((response: any) => {
      this.Monthdealpro=response.data.slice(0, 3);
      this.poploader=false;
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
      
    });
  }
  viewtodaysdeal() {
    // this.prodloader = true;
    // this.imgloader = false;
    this.request.gettodaysdeal('').subscribe((response: any) => {
      this.Product = response.data;
      // this.pagenation = response?.meta;
      // this.pagess = this.pagenation?.links;
      this.prodloader = false;  
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
 


  proddetail(id:any){
    this.router.navigate(['productdetail', id]);
  }
  addtowishlist(prd_id:any){
    if(this.userid==0){
      this. openlogin()
    }
    else{
    let edata4={
      user_id:this.userid,
      product_id:prd_id
    } 
    this.request.addtowishlist(edata4).subscribe((res: any) => {
      if (res.message == 'Product is successfully added to your wishlist') {
        this.addRecordSuccess() ;     
        this.sharedService.sendWishlistEvent();
      }
      else  {
        this.toastr.error(res.message);
      }
    }, (error: any) => {
      console.log("error",error);
    });
  }
  }
  deleteRecord(id:any) {
    this.request.deletewishproud2(id).subscribe((response: any) => {
      if(response.message=="Product is removed from wishlist"){
        this.deleteRecordSuccess();
        this.sharedService.sendWishlistEvent();
      }
      else{
        this.toastr.error( response.message);
        
      }
  
     }, (error: any) => {
       console.log(error);
     });
  }
  addtocart(_id:any){
    if(this.userid==0){
      this. openlogin()
    }
    else{
    let edata={
      id : _id,
      variant:this?.varient_value.replace(/\s/g, ""),
      user_id: this.userid,
      quantity: this.quantityy  
    }
    this.request.addtocart(edata).subscribe((res: any) => {
      if (res.message == 'Product added to cart successfully') {  
        this.addRecordSuccess();     
        this.sharedService.sendClickEvent();
      }
      else if(res.message== 'Minimum 1 item(s) should be ordered'){
        this.toastr.info(res.message);
      } 
      else if(res.message== 'Stock out'){
        this.toastr.error(res.message);
      }
      else  {
        console.log("error",res);
      }
    }, (error: any) => {
      console.log("error",error);
    
    });
  }
  }
  quickview(id: any, content: any) {
    // this.totalprice=''
    this.quantityyy = 0
    this.product_id = id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {

      console.log("proddetaill", response);
      this.Peoduct = response.data[0];
  
      this.prod_price = this.Peoduct.main_price;
      this.storked_pricee=this.Peoduct.stroked_price;
      
      this.choice = this.Peoduct.choice_options;
      //  this.stocck=(this.Peoduct.current_stock)-1;
      this.stk = this.Peoduct.current_stock;
      this.stocckkk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.totalprice=this.Peoduct.main_price.replace('Rs','');
      this.subItemm=0
      if (this.Peoduct.current_stock == 0) {
        this.stocck = 0

      }
      else {
        this.stocck = (this.Peoduct.current_stock) ;
      }
      //  window.scroll(0,0);             
      if (this.Peoduct.choice_options.length == 0) {
        this.varient_value = ''
      }
      else {
        this.varient_value = this.choice[0]?.options[0];
      }

      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
      });

    },
      (error: any) => {
        console.log(error);
      });

  }

  getValue(val: any) {      
    if (val<= 0) {
      val = 1     
    }
    else if (val > this.stocckkk) {
      val = this.stocckkk       
    }
    this.quantityyy = val
    this.stocck = this.stocckkk - val 
    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      console.log(res);     
      this.totalprice = res.price.toFixed(2);       
    // this.totalprice = this.dec.toFixed(2)  
    })

  }
  increaseqty(){
    this.quantityyy++;
    this.stocck--;
    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      console.log(res);
      this.totalprice = res.price.toFixed(2);
    // this.totalprice = this.dec.toFixed(2) 

    })
      }
      decreaseqty(){
        this.quantityyy--;
        this.stocck++;    
        this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
          console.log(res);       
          this.totalprice = res.price.toFixed(2);         
        // this.totalprice = this.dec.toFixed(2)      
        })   
      }
      selectvar(weight:any,i:any){
        this.varient_value=weight.replace(/\s/g, "")
        this.subItemm=i
        this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
    

          this.prod_price = res?.price_string;
      this.storked_pricee=res?.stroked_price;

          this.totalprice=(res?.price_string).replace('Rs','');
          this.varprise=res?.price_string;
          this.stk=res?.stock;
          this.stocckkk=res?.stock;
          if(res?.stock==0){
            this.stocck=0
            this.quantityyy=0;
           
           }
           else {
            this.stocck=(res?.stock);
            this.quantityyy=0;
           }   


        }, (error: any) => {
          console.log("error",error);
        
        });
      }
  addtocart2(){
    if(this.userid==0){
      this. openlogin()
    }
    else{
    let edata={
      id : this.product_id,
      variant:this.varient_value.replace(/\s/g, ""),
      user_id: this.userid,
      quantity: this.quantityyy,
      buyertype:this.buyertypeid,  
    }
      
    this.request.addtocart(edata).subscribe((res: any) => {
      if (res.message == 'Product added to cart successfully') {    
        this.addRecordSuccess();
           this.modalService.dismissAll();
           this.sharedService.sendClickEvent();
      }
      else if (res.message=='Minimum 1 item(s) should be ordered'){
        this.toastr.success( res.message);
       
      }
      else if(res.message== 'Stock out'){
        this.toastr.error(res.message);
      }
    },
     (error: any) => {
      // this.toastr.error(error);
      console.log("error",error);
    
    });
  }
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

  qtyChange(event: any, i: any, img: any) {
    if (this.quantityarray.length == 0) {
      this.quantityarray.push({ "id": img.id, "value": event.target.value });
    }
    else {
      console.log(" this.quantityarray", this.quantityarray);
      const index = this.quantityarray.findIndex((fruit: { id: any; }) => fruit.id == img.id);
      console.log("obj", index);
      if (index > -1) {
        console.log("if", index);

        this.quantityarray[index].value = event.target.value;
      }
      else {
        console.log("else", index);
        this.quantityarray.push({ "id": img.id, "value": event.target.value });
      }
    }
    console.log("this.quantityarray", this.quantityarray);
  }

  prodaddtocart(img: any) {
    // console.log("img", img);
    // if (this.userid == 0) {
    //   this. openlogin()
    // }
    // else {
      if (img.variants.length == 0 || img.variants[0]?.options?.length == 0) {
        console.log("empty");
        this.varient_value = ''
      }
      else if (img.variants[0]?.options?.length == 1) {
        this.varient_value = img.variants[0]?.options[0];
      }
      else {
        this.varient_value = this.selectedvar;
      }
      const index = this.quantityarray.findIndex((fruit: { id: any; }) => fruit.id == img.id);
      if (index > -1) {
        this.totalqty = this.quantityarray[index].value;
      }
      else {
        this.totalqty = 1
      }

      if( img.variants?.length > 1){
        this.currentpackagevalue= img?.variants[1]?.options[0]
        this.edata = {
          id: img.id,
          variant: (this.varient_value?.replace(/\s/g, "")+"-"+ this.currentpackagevalue.replace(/\s/g, "")),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
      }
      else{
        this.edata = {
          id: img.id,
          variant: this.varient_value?.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
      }
      this.request.addtocart(this.edata).subscribe((res: any) => {
        console.log("resssssssssssssss", res);
        if (res.result == true) { 
          this.addRecordSuccess();
          this.modalService.dismissAll();
          this.sharedService.sendClickEvent();
        }
        else  {
          this.toastr.info(res.message);
        }
       
      },
        (error: any) => {
          this.toastr.error(error);
          console.log("error", error);

        });
    // }
  }
  bestsellingselectvar(weight: any, i: any, id: any,varient:any) {  
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      console.log("selectvar res", res);
      this.Product[i].stroked_price = res.stroked_price
      this.Product[i].main_price = res.price_string;
      this.Product[i].discount_amount = res.discount_amount;
        this.Product[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }

  onScrollDown(eve: any) {
    console.log("scroll down");
    // this.pagenum += 1
    // console.log("scroll down", this.pagess);
    // console.log("scroll pagenum", this.pagenum);
    // const pageurl = this.pagess[this.pagenum]
    // console.log("pageurl", pageurl);
    // if (pageurl?.url !== null && pageurl !== undefined) {
    //   this.pageload = false;
    //   this.prodloader = true;
    //   this.sidepoploader = true;
    //   this.request.getpage(pageurl?.url).subscribe((response: any) => {
    //     this.newpageProduct = response.data;
    //     this.pagenation = response.meta;
    //     this.pagess = this.pagenation.links;
    //     console.log("this.pagess", this.pagess);
    //     this.pagee = this.pagenation.current_page;
    //     this.Product.push(...this.newpageProduct)
    //     this.pageload = true;
    //     this.prodloader = false;
    //     this.sidepoploader = false;
    //     console.log("this.Product", this.Product);

    //     setTimeout(() => {
    //       this.imgloader = true;
    //     }, 2000);
    //   })
    // }
  }

  onScrollUp(ev: any) {
    console.log("scrolled up!",);
  }
}
