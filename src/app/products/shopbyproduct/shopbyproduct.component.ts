import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shopbyproduct',
  templateUrl: './shopbyproduct.component.html',
  styleUrls: ['./shopbyproduct.component.css'],
   providers: [NgbRatingConfig,ToastrService],
  
})
export class ShopbyproductComponent implements OnInit {
  p: number = 1;
  Sort = [
    { id: 'price_low_to_high', value: 'price_low_to_high' },
    { id: 'price_high_to_low', value: 'price_high_to_low' },
    { id: 'new_arrival', value: 'new_arrival' },
    { id: 'popularity', value: 'popularity' },
    { id: 'top_rated', value: 'top_rated' },
  ];
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
   _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  Product: any;
  Allbrands: any;
  brand_id: any;
  openproduct: any;
  Productdet: any;
  Peoduct: any;
  page1: boolean=true;
  page2: boolean=false;
  quantityy: any;
  quantityyy:number = 1
  cat_id: any;
  Allcat: any;
  loadingIndicator: boolean | undefined;
  Relatedprod: any;
  varient_value="";
  varprise: any; 
  choice: any;
  register!: FormGroup;
  product_iddd: any;
  product_iidd: any;
  message!: FormGroup;
  pagenation: any;
  pagess: any;
  stocck: any;
  searchh: any;
  registerForm: any;
  sortForm:  FormGroup;
  Bestsellpro: any;
  currentRate = 0;
 
starList: boolean[] = [true,true,true,true,true]; 
  rating: any;
  photoos: any;
  tags: any;
  colors: any;
  stk: any;
  qtyinc: boolean=true;
  qtydec:boolean=true;
 
  totalprice:any;
  dec: any;
  outofstackbtn: boolean=false;
  addcartbtn: boolean=true;
  sideloader1: boolean=true;
  poploader: boolean=true;
  prodcount=[1,2,3,4,5,6,7,8,9,10];
  constructor(private router: Router, private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private modalService: NgbModal,config: NgbRatingConfig,
    private toastr: ToastrService, private toast: ToastrService,private _location: Location) { 


      config.max = 5;
      config.readonly = true;


    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user?.id; 
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;

     this.sortForm = this.formBuilder.group({
      min: [''], 
      max: [''],
      category:['']
     
    });
 
  }
  
  ngOnInit(): void {
    this.viewdata(1);
   this.viewbrand();
   this.viewcat();
this.viewbestpro();
   this.register = this.fb.group({ 
    rating:[''],
    comment: [''],
 
  });

  this.message = this.fb.group({ 
    title:['',[Validators.required]],
    message: ['',[Validators.required]],
 
  });
  
  }
  get f() {
    return this.register.controls;
    
  }
   
viewdata(page:any){
  this.request.getallproducts(page).subscribe((response: any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("allproduct",this.Product);
  });
}
getpage(url:any){
  this.request.getpage(url).subscribe((response:any)=>{
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("allproduct",this.Product);
  })
}
viewbestpro(){
  this.request.getbestsellpro().subscribe((response: any) => {
    this.Bestsellpro=response.data.slice(0,3);
    this.rating=this.Bestsellpro.rating;    
    this.poploader=false; 
    console.log("rating",this.rating);             
    //   for(var i=0;i<=4;i++){  
    //     if(i<=data){  
    //       this.starList[i]=false;  
    //     }  
    //     else{  
    //       this.starList[i]=true;  
    //     }  
    //  }  
    console.log("best sellling",this.Bestsellpro);  
  });
}

viewbrand(){
  this.request.getallbrands().subscribe((response: any) => {
    this.Allbrands=response.data;   
    console.log("response",response);
    console.log("Allbrands",this.Allbrands);
  });
}
backk(){
// this._location.back();
this.page1=true;
this.page2=false;

}

  viewproductrow(img: any){
    this.totalprice=''
    this.product_id=img.id
    this.quantityyy=0
  console.log("detail", this.product_id);
  this.request.getproddetail(this.product_id).subscribe((response: any) => {
    this.page1=false;
    this.page2=true; 
    console.log("proddetaill",response);
         this.Peoduct=response.data[0];
         this.choice=this.Peoduct.choice_options;
         this.stocck=(this.Peoduct.current_stock);
         this.stk=this.Peoduct.current_stock;
         this.photoos=this.Peoduct.photos;
         this.colors=this.Peoduct.colors;
         this.tags=this.Peoduct.tags;
         this.varprise=this.Peoduct.main_price;
         this.totalprice =this.Peoduct.main_price.replace('Rs','');
         console.log("res",this.Peoduct); 
         console.log("choise option",this.Peoduct.choice_options); 
         window.scroll(0,0);
     
         if(this.Peoduct.choice_options.length==0) {
          console.log("empty"); 
          this.varient_value=''
        }
        else{
          this.varient_value=this.choice[0]?.options[0];
        }
         console.log("optiooooons",this.varient_value);
  },
   (error: any) => {
    console.log(error);
  });
  this.request.getrelatedprod(this.product_id).subscribe((response: any) => {  
    console.log("relatedprod",response);
         this.Relatedprod=response.data;
         console.log("res",this.Relatedprod); 
  },
   (error: any) => {
    console.log(error);
  });
  
   
  }
  firstDropDownChanged(data: any) 
{
  console.log(data.target.value);
  this.quantityy=data.target.value;
    return this.quantityy= this.quantityy; 
}
addtocart(_id:any){
  if(this.quantityyy==0){
    this.quantityy=1
  }
  else{
    this.quantityy=this.quantityyy
  }
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
  oncatChange(tbl_id:any) {
    console.log("hiii",tbl_id.value);
     this.cat_id = tbl_id.value;    
     this.page1=true;
     this.page2=false;
    this.request.getcatprodbyid(this.cat_id).subscribe((response: any) => {
      console.log("catprod",response);
           this.Product=response.data;
           this.pagenation=response.meta   
           this.pagess=this.pagenation.links
           console.log("res",this.Product); 
    },
     (error: any) => {
      console.log(error);
    });
  }
  increaseqty(){
this.quantityyy++;
this.stocck--;
this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
 this.totalprice=this.dec.toFixed(2)
console.log("-dec",this.dec);
  }
  decreaseqty(){
    this.quantityyy--;
    this.stocck++;
    this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
    this.totalprice=this.dec.toFixed(2)
    // console.log("-quntity",this.quantityyy);
    // console.log("price",this.varprise.replace('Rs',''));
    // console.log("totalprice",this.totalprice);
    
  }
  viewcat(){
    this.request.getallcat().subscribe((response: any) => {
      this.Allcat=response.data;
      // this.page1=true,
      // this.page2=false,
      console.log("response",response);
      console.log("allcategory",this.Allcat);
      this.sideloader1=false;
      // this.filteredData=data.response;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
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
  selectvar(weight:any){
    this.varient_value=weight.replace(/\s/g, "")
    this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
      console.log(res);
      this.varprise=res?.price_string; 
      this.totalprice=(res?.price_string).replace('Rs','');
      this.stocck=(res?.stock);
      this.quantityyy=0;
      console.log(this.varprise);
    }, (error: any) => {
      console.log("error",error);
    });
  }
  addreview(content:any,_id:any){
    this.product_iddd=_id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

  }
  submitreview(form: FormGroup){
    let edata2={
      product_id : this.product_iddd,
      user_id: this.userid,
      rating:""+this.register.controls['rating'].value,
      comment: ""+this.register.controls['comment'].value,
    }
    console.log(edata2);  
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log(res);
     if (res.result==true) {  
        console.log("done",res);     
        this.toastr.success(res.message);
     }
       else  {
        this.toastr.error(res.message);
        console.log("error",res);
  
     }
    }, (error: any) => {
      console.log("error",error);
    
    });
  
  }
  addconv(content:any,_id:any){
    this.product_iidd=_id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  sendconv(form:FormGroup){
    let edata={
      product_id:this.product_iidd,
      user_id:this.userid,
      title:form.value.title,
      message:form.value.message
    }
    console.log("edata,",edata);
    this.request.addconv(edata).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Conversation created') { 
        this.toastr.success('Conversation created', '');  
        this.modalService.dismissAll();    
      }
      else  {
        console.log("error",res);
        this.toastr.error(res.message);
  
      }
    }, (error: any) => {
      this.toastr.error(error.message);
      console.log("error",error); 
    });

  }
  apply(form: FormGroup){
    console.log("submitted");
    console.log("submitted",form.value.category,form.value.min,form.value.max);
    
    this.request.filterdataa(form.value.category,form.value.min,form.value.max).subscribe((response: any) => {
      this.Product=response.data;
      this.pagenation=response.meta   
      this.pagess=this.pagenation.links
      this.modalService.dismissAll();
      // this.page1=false,
      // this.page2=false,
      // this.page3=true,
      console.log("response",response);
       console.log("allprod",this.Product);
   
    });

  }
  filterDatatable(event:any){
    console.log(event.target.value)
    this.searchh=event.target.value
    this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
      this.Product=response.data;
      this.pagenation=response.meta   
    this.pagess=this.pagenation.links
      console.log("response",response);
       console.log("search",this.Product);
   
    });
  
      }
      get f1() {
        return this.sortForm.controls;
      }
      opensort(content:any){
        this.sortForm.reset();
        this.modalService.open(content, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
        });
      }
      onsortChange(val:any){
   
        console.log("value",val.value);
        this.request.getsortprod(val.value).subscribe((response: any) => {
          console.log("sort response",response);
          this.Product=response.data;
          this.pagenation=response.meta   
    this.pagess=this.pagenation.links
          // this.page1=false,
          // this.page2=false,
          // this.page3=true,
        
           console.log("sort",this.Product);
       
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