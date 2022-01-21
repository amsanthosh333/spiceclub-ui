import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Location} from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var jQuery: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ToastrService],
})
export class HomeComponent implements OnInit {
  mainloader:boolean=true;
  Slider: any;
  loadingIndicator: boolean | undefined;
  Futurecatg: any;
  opencat: any;
  FeaturePro: any;
  page1: boolean=true;
  page2: boolean=false;
  openproduct: any;
  Peoduct: any;
  page3: boolean=false;
  Banners: any;
  Todaysdeal: any;
  sliddder: any;
   imggg= 'https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png'
  Bestsellpro: any;
  Futuredpro: any;
  photoo: any=[];
  photooo:any = [
    "https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png",
    "https://neophroncrm.com/spiceclubnew/public/uploads/all/Vcp3JrmWUsJH04QO9b14cRe0maSP03F87nsfHXaw.png"
  ];
  p1: any;
  p2: any;
  product_id: any;
  choice: any;
  stocck: any;
  colors: any;
  tags: any;
  varprise: any;
  Relatedprod: any;
  userid: any;
  currentRate = 0;
  register!: FormGroup;
  varient_value: any;
  quantityy: any;
  Allbrands: any;
  Allcat: any;
  Homecat: any;
  // mainloader:boolean=true;
  loader1: boolean =true;
  loader2: boolean=true;
  loader3: boolean=true;
  loader4: boolean=true;
  loader5: boolean =true;
  loader6: boolean=true;

  checkedColumns = {};
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
 
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Wishlist: any;
  quantityyy: any;
  buyertypeid: any;
  prod_price: any;
  stk: any;
  photoos: any;
  totalprice: any;
  loadingg: boolean=true;
  myCompOneObj: any;
  

  constructor(private router: Router, private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private toastr: ToastrService,private modalService: NgbModal,
    config: NgbRatingConfig,private _location: Location) {

      this.loader1=true;
      this.loader2=true;

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
  
    console.log("slidermmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",this.photooo);

  
   }

  ngOnInit(): void {
    
  
    // myCompOneObj.viewwishlist();
    setTimeout(() => {
      this.loadingg = false;
    }, 2000);
    this.viewdata();
    this.viewcategorydata();
    this.gethomeecat();
    this.viewbestsellpro();
    this.viewfuturedpro();
    this.viewdata3();
    this.viewbrands();
// this.viewdata2();
    // this.viewdata3();
    // this.viewdata4();

    
 

    this.register = this.fb.group({ 
      rating:[''],
      comment: [''],
   
    });

  
  }
 

  viewdata(){
    this.request.getslider().subscribe((response: any) =>{ 
      this.Slider=response.data;
      console.log("slider.data",response.data);
      this.photoo = this.Slider.map( (item:any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.photo);
      console.log("photosss",this.photoo)
      this.loader1=false;
      this.mainloader=false;
       setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  viewbestsellpro(){
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro=response.data.slice(0,8);
      console.log("best sellling",this.Bestsellpro);  
       this.loader3=false;
    });
  }
  viewfuturedpro(){
    this.request.getfuturedpro().subscribe((response: any) => {
      this.Futuredpro=response.data;   
      this.loader6=false;
      console.log("response.data",response);
      console.log("allbrands",this.Futuredpro);
   
    });
  }
  gethomeecat(){
    this.request.gethomecat().subscribe((response: any) => {
      this.Homecat=response.data;
      this.loader2=false;
      console.log("response",response);
      console.log("allcategory",this.Allcat);
    });
  }
  openquick(content:any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  viewdata3(){
    this.request.getbanner().subscribe((response: any) => {
      this.Banners=response.data;  
      this.loader4=false;  
       console.log("slider.data",response.data);
      console.log("slider",this.Slider);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  proddetail(id:any){
    // console.log("detail page",id);
    window.scroll(0,0);
    this.router.navigate(['productdetail', id]);
    console.log("navigate to category");
  }
  viewproductrow(img: any){
    
    this.product_id=img.id
  console.log("detail", this.product_id);
  this.request.getproddetail(this.product_id).subscribe((response: any) => {
    this.page1=false;
    this.page2=true;
    console.log("proddetaill",response);
         this.Peoduct=response.data[0];
         this.choice=this.Peoduct.choice_options;
         this.stocck=this.Peoduct.current_stock;
         this.photoo=this.Peoduct.photos
         this.colors=this.Peoduct.colors
         this.tags=this.Peoduct.tags
         this.varprise=this.Peoduct.main_price
         console.log("res",this.Peoduct); 
         console.log("choise option",this.Peoduct.choice_options); 
         window.scroll(0,0);
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

  // selectvar(weight:any){
  //   this.varient_value=weight.replace(/\s/g, "")
  //   this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
  //     console.log(res);
  //     this.varprise=res?.price_string;
  //     this.stocck=res?.stock;
  //     // if (res.message == 'Product added to cart successfully') {       
  //     // }
  //     // else  {
  //     //   console.log("error",res);
  
  //     // }
  //     console.log(this.varprise);
  //   }, (error: any) => {
  //     console.log("error",error);
    
  //   });
  // }
  backk(){
    // this._location.back();
    this.page1=true;
    this.page2=false;
    
    }
    gotodeals(){
      this.router.navigate(['/daydeal']);
      window.scroll(0,0)
    console.log("navigate to deal");
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
        }
        else if(res.message== 'Minimum 1 item(s) should be ordered'){
          console.log("minimum 1");
        } 
        else if(res.message== 'Stock out'){
          console.log("Stock out");
        }
        else  {
          console.log("error",res);
        }
      }, (error: any) => {
        console.log("error",error);
      
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
         
         this. addRecordSuccess();
         
        }
        else  {
          this.toastr.success('', res.message);
          console.log("error",res);
    
        }
      }, (error: any) => {
        console.log("error",error);
      
      });
    
    }
    submitreview(form: FormGroup){
      let edata2={
        product_id : this.product_id,
        user_id: this.userid,
        rating:""+this.register.controls['rating'].value,
        comment: ""+this.register.controls['comment'].value,
      }
      console.log(edata2);  
      this.request.addreview(edata2).subscribe((res: any) => {
        console.log(res);
       if (res.message == 'Product added to cart successfully') {  
          console.log("done",res);     
       }
         else  {
          console.log("error",res);
    
       }
      }, (error: any) => {
        console.log("error",error);
      
      });
    
    }
      
viewbrands(){
  this.request.getallbrands().subscribe((response: any) => {
    this.Allbrands=response.data;
    this.page1=true,
    this.page2=false,
    console.log("response.data",response.data);
    console.log("allbrands",this.Allbrands);
    this.loader5=false
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
brandnavigate(id:any){
  window.scroll(0,0);
  this.router.navigate(['brands', id]);
  console.log("navigate to brand");

}

viewcategorydata(){
  this.request.getallcat().subscribe((response: any) => {
    this.Allcat=response.data;
//     var Arr1 = this.Allcat,
//     Arr2 = [],
//     Arr3 = [];

// for (var i=0;i<Arr1.length;i++){
//     if ((i+2)%2==0) {
//         Arr3.push(Arr1[i]);
//         console.log("odd",Arr3);
//         this.Alloddcat=Arr3
//     }
//     else {
//         Arr2.push(Arr1[i]);
//         this.Allevencat=Arr2
//         console.log("even",Arr2);
//     }
// }

// console.log(Arr2);
    // this.page1=true,
    // this.page2=false,
    console.log("response",response);
    console.log("allcategory",this.Allcat);
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 500);
  });
}
catnavigate(id:any){
  window.scroll(0,0);
  this.router.navigate(['category', id]);
  console.log("navigate to category");
}

quickview(id:any,content:any){
  // this.totalprice=''
    this.quantityyy=1
    this.product_id=id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
     
      console.log("proddetaill",response);
           this.Peoduct=response.data[0];
           this.prod_price=this.Peoduct.main_price;
           this.choice=this.Peoduct.choice_options;
          //  this.stocck=(this.Peoduct.current_stock)-1;
           this.stk=this.Peoduct.current_stock;
           this.photoos=this.Peoduct.photos;
           this.colors=this.Peoduct.colors;
           this.tags=this.Peoduct.tags;
           this.varprise=this.Peoduct.main_price;
          //  this.totalprice=this.Peoduct.main_price.replace('Rs','');
           console.log("res",this.Peoduct); 
           console.log("choise option",this.Peoduct.choice_options); 
          //  console.log("stocck",this.stocck); 
           console.log("stk",this.stk); 
           if(this.Peoduct.current_stock==0){
            this.stocck=0
            
           }
           else {
            this.stocck=(this.Peoduct.current_stock)-1;
           }   
          //  window.scroll(0,0);             
          if(this.Peoduct.choice_options.length==0) {
            console.log("empty"); 
            this.varient_value=''
          }
          else{
            this.varient_value=this.choice[0]?.options[0];
          }
           console.log("optiooooons",this.choice[0]?.options[0] );
           
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
    selectvar(weight:any){
      this.varient_value=weight.replace(/\s/g, "")
      this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
        console.log(res);
        this.prod_price=res?.price_string;
        this.totalprice=(res?.price_string).replace('Rs','');
        this.varprise=res?.price_string;
        this.stk=res?.stock;
        if(res?.stock==0){
          this.stocck=0
          this.quantityyy=0;
         
         }
         else {
          this.stocck=(res?.stock)-1;
          this.quantityyy=1;
         }   

        console.log(this.varprise);
        console.log(this.stocck);
        console.log(res?.stock);

      }, (error: any) => {
        console.log("error",error);
      
      });
    }
addtocart2(){
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
function animateQuickView(id: any, selectedImage: any, finalWidth: number, maxQuickWidth: number, arg4: string) {
  throw new Error('Function not implemented.');
}

