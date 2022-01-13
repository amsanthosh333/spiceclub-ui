import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service'; 
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class ProductdetailComponent implements OnInit {
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
  openproduct: any;
  Peoduct: any;
  choice: any;
  stocck: any;
  id: any;
  dec: any;
  totalprice: any;
  varprise: any;
  quantityyy: any;
  cat_id: any;
  Product: any;
  varient_value: any;
  product_iddd: any;
  register!: FormGroup;
  quantityy: any;
  Relatedprod: any;
  stk: any;
  photoos: any;
  colors: any;
  tags: any;
  currentRate = 0;
  error1: any;
  comment!: FormGroup;
  Comments: any;
  commtotal: any;
  currentRatess: any;
  photoloader: boolean=true;
  contentloader: boolean=true;
  discriptloader: boolean=true;
  loader6: boolean=true;
  buyertypeid: any;

  constructor(private router: Router,private request: RequestService,private route: ActivatedRoute,private formBuilder: FormBuilder,private fb: FormBuilder,
   private modalService: NgbModal,config: NgbRatingConfig,private _location: Location,private toastr: ToastrService,) { 
   
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
     this.buyertypeid=this.currentdetail.user?.buyertypeid;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("brand id",this.id);
    this.viewproductrow(this.id);
     this.comment = this.fb.group({ 
      rating:['',[ Validators.required]],
      comment: ['',[ Validators.required]],
   
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
  viewproductrow(id: any){
    this.totalprice=0.00
    this.product_id=id
    this.quantityyy=0
  console.log("detail", this.product_id);
  this.request.getproddetail(this.product_id).subscribe((response: any) => {
    // window.scroll(0,0);
    console.log("proddetaill",response);
         this.Peoduct=response.data[0];
         this.choice=this.Peoduct.choice_options;
         this.stocck=(this.Peoduct.current_stock);
         this.stk=this.Peoduct.current_stock;
         this.photoos=this.Peoduct.photos;
         this.colors=this.Peoduct.colors;
         this.tags=this.Peoduct.tags;
         this.varprise=this.Peoduct.main_price;
         this.currentRatess=this.Peoduct.rating;
         this.photoloader=false;
         this.contentloader=false;
         this.discriptloader=false;
        //  this.totalprice =this.Peoduct.main_price.replace('Rs','');
         console.log("res",this.Peoduct); 
         console.log("choise option",this.Peoduct.choice_options); 
        
         this.getcommentsss()
        //  if(this.Peoduct.current_stock==0){
        //    console.log("stock 0");
        //    this.outofstackbtn=true;
        //    this.addcartbtn=false
        //  }
        //  else{
        //   this.outofstackbtn=false;
        //   this.addcartbtn=true
        //  }
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
         this.loader6=false;
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

  selectvar(weight:any){
    
    this.varient_value=weight.replace(/\s/g, "")
    this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
      console.log(res);
      this.varprise=res?.price_string; 
      this.totalprice=(res?.price_string).replace('Rs','');
      this.stocck=(res?.stock);
      this.quantityyy=0;

      // if (res.message == 'Product added to cart successfully') {       
      // }
      // else  {
      //   console.log("error",res);
  
      // }
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
     if (res.message == 'Product added to cart successfully') {  
     this. addRecordSuccess();
        console.log("done",res);     
     }
       else if(res.message=='You cannot review this product') {
         this.toastr.error(res.message);
        console.log("error",res.message);
  
     }
    }, (error: any) => {
      console.log("error",error);
    
    });
  
  }
  // addconv(content:any,_id:any){
  //   this.product_iidd=_id;
  //   this.modalService.open(content, {
  //     ariaLabelledBy: 'modal-basic-title',
  //     size: 'lg',
  //   });
  // }
  backk(){
    this._location.back(); 
   console.log("back");
    }
    getcommentsss(){
      this.request.getproductcomments(this.id).subscribe((response: any) => {
        this.Comments=response.data;
        this.commtotal=this.Comments.length
        console.log("Comments",this.Comments);  
      },
      (error: any) => {
        console.log("error",error);
      });
    }
    addcomment(form: FormGroup){
      this.error1 = '';
      if (this.comment.invalid) {
    
        if(!this.comment.get('rating')?.valid){
          this.error1 = '*give star';
        }
        else if ( !this.comment.get('comment')?.valid) {
          this.error1 = '*type some comment';
        }
        console.log(this.error1)  
        return;
      }
      else{
        if ((this.comment.get('rating'))?.value!=Number){
          form.value.rating=0
          let edata2={
            product_id: this.product_id,
            user_id: this.userid,
            rating:form.value.rating,
            comment:form.value.comment,
          }
          console.log(edata2); 
      this.request.addreview(edata2).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Comment  Submitted') { 
          this.toastr.success('Comment  Submitted', '');      
          this.getcommentsss();
        }
        else  {
          this.toastr.error(res.message);
          console.log("error",res);
    
        }
      }, (error: any) => {
        console.log("error",error);  
      }); }
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