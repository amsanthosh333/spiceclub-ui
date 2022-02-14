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

@Component({
  selector: 'app-monthdeal',
  templateUrl: './monthdeal.component.html',
  styleUrls: ['./monthdeal.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class MonthdealComponent implements OnInit {

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
  Daydealpro: any;
  Monthdealpro: any;
  poploader: boolean=true;
  imgloader: boolean=false;
  buyertypeid: any;
  quantityyy!: number;
  prod_price: any;
  photoos: any;
  stk: any;
  colors: any;
  tags: any;
  totalprice: any;
  likedd=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  likeddd=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
  stocckkk: any;
 
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService
    ,private toastr: ToastrService,config: NgbRatingConfig,private modalService: NgbModal,
    private sharedService: SharedService) {

      config.max = 5;
      config.readonly = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')   
    );

    console.log("currentuser details=", this.currentUserSubject);
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
    this. viewdaydeal();
    this.viewmonthdeal();
  }

  toggle(img:any,index:any): void {
    this.likeddd[index] = !this.likeddd[index];   
    if(this.likeddd[index]==true){
      console.log("true , add recrd");
      this.addtowishlist(img.id);
    }
    else if( this.likeddd[index]==false){
      console.log("false , delectrecord");
      this.deleteRecord(img.id);
    }
  
  }
  toggledelete(img:any,index:any): void {
    this.likedd[index] = !this.likedd[index];   
    if(this.likedd[index]==true){
      console.log("true , add recrd");
      this.addtowishlist(img.id);
    }
    else if( this.likedd[index]==false){
      console.log("false , delectrecord");
      this.deleteRecord(img.id);
    }
  }
  viewdaydeal(){
    this.request.getdaydealpro().subscribe((response: any) => {
      this.Daydealpro=response.data.slice(0, 4);
      this.prodloader=false;
      console.log("Daydealpro",this.Daydealpro);  
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
  }
  viewmonthdeal(){
    this.request.getmonthdealpro().subscribe((response: any) => {
      this.Monthdealpro=response.data;
      this.poploader=false;
      console.log("Monthdealpro",this.Monthdealpro);  
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
  }
  proddetail(id:any){
    this.router.navigate(['productdetail', id]);
    console.log("navigate to detail");
  }
  addtowishlist(prd_id:any){
    if(this.userid==0){
      this.toastr.info('You need to login', '');
    }
    else{
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
        this.sharedService.sendClickEvent();   
      }
      else  {
        this.toastr.error(res.message);
        console.log("error",res.message);
      }
    }, (error: any) => {
      console.log("error",error);
    });
  }
  }
  deleteRecord(id:any) {
    console.log("deleteeerow",id);
    this.request.deletewishproud2(id).subscribe((response: any) => {
      console.log(response);
      if(response.message=="Product is removed from wishlist"){
        console.log("deleted",response.message);
        this.deleteRecordSuccess();
        this.sharedService.sendClickEvent();
      }
      else{
        this.toastr.error( response.message);
        console.log("error ,product is not deleted")
        
      }
  
     }, (error: any) => {
       console.log(error);
     });
  }
  addtocart(_id:any){
    if(this.userid==0){
      this.toastr.info('You need to login', '');
    }
    else{
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
        this.sharedService.sendClickEvent();    
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
  }
  quickview(id: any, content: any) {
    // this.totalprice=''
    this.quantityyy = 0
    this.product_id = id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {

      console.log("proddetaill", response);
      this.Peoduct = response.data[0];
      this.prod_price = this.Peoduct.main_price;
      this.choice = this.Peoduct.choice_options;
      //  this.stocck=(this.Peoduct.current_stock)-1;
      this.stk = this.Peoduct.current_stock;
      this.stocckkk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      //  this.totalprice=this.Peoduct.main_price.replace('Rs','');
      console.log("res", this.Peoduct);
      console.log("choise option", this.Peoduct.choice_options);
      //  console.log("stocck",this.stocck); 
      console.log("stk", this.stk);
      if (this.Peoduct.current_stock == 0) {
        this.stocck = 0

      }
      else {
        this.stocck = (this.Peoduct.current_stock) ;
      }
      //  window.scroll(0,0);             
      if (this.Peoduct.choice_options.length == 0) {
        console.log("empty");
        this.varient_value = ''
      }
      else {
        this.varient_value = this.choice[0]?.options[0];
      }
      console.log("optiooooons", this.choice[0]?.options[0]);

      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
      });

    },
      (error: any) => {
        console.log(error);
      });

  }

  increaseqty(){
    this.quantityyy++;
    this.stocck--;
    // this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
    //  this.totalprice=this.dec.toFixed(2)
    // console.log("-dec",this.dec);
      }
      decreaseqty(){
        this.quantityyy--;
        this.stocck++;
        // this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
        // this.totalprice=this.dec.toFixed(2)
        // // console.log("-quntity",this.quantityyy);
        // // console.log("price",this.varprise.replace('Rs',''));
        //  console.log("totalprice",this.totalprice);
        
      }
      getValue(val: any) {
        if (val<= 0) {
          val = 1
          console.log( "valif",val);
        }
        else if (val > this.stocckkk) {
          val = this.stocckkk
          console.log( "valel",val);
        }
        this.quantityyy = val
        this.stocck = this.stocckkk - val
    
        console.log( "val",val);
        console.log("this.stocckkk-val",this.stocckkk - val);
        console.log("this.stocckkk",this.stocckkk);
        console.log(this.stocck);
        this.stocck
    
    
      }
      selectvar(weight:any){
        this.varient_value=weight.replace(/\s/g, "")
        this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
          console.log(res);
          this.prod_price=res?.price_string;
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

          console.log(this.varprise);
          console.log(this.stocck);
          console.log(res?.stock);

        }, (error: any) => {
          console.log("error",error);
        
        });
      }
  addtocart2(){
    if(this.userid==0){
      this.toastr.info('You need to login', '');
    }
    else{
    let edata={
      id : this.product_id,
      variant:this.varient_value.replace(/\s/g, ""),
      user_id: this.userid,
      quantity: this.quantityyy,
      buyertype:this.buyertypeid,  
    }
    console.log(edata);  
      
    this.request.addtocart(edata).subscribe((res: any) => {
      console.log("resssssssssssssss",res);
      if (res.message == 'Product added to cart successfully') {    
        console.log("Product added to cart successfully");
        this.addRecordSuccess();
           this.modalService.dismissAll();
           this.sharedService.sendClickEvent();
      }
      else if (res.message=='Minimum 1 item(s) should be ordered'){
        this.toastr.success( res.message);
       
      }
      else if(res.message== 'Stock out'){
        this.toastr.error(res.message);
        console.log("Stock out");
      }
    },
     (error: any) => {
      this.toastr.error(error);
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

  
}
