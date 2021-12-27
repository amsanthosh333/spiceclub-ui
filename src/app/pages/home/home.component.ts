import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service'; 
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal,) {

    // console.log("slidermmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",this.photoo);
    // this.viewdata();
    console.log("slidermmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",this.photooo);
   }

  ngOnInit(): void {
    this.viewdata();
    this.viewbestsellpro();
    this.viewfuturedpro();
    this.viewdata3();
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
       setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  viewbestsellpro(){
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro=response.data.slice(0,8);
      console.log("best sellling",this.Bestsellpro);  
    });
  }
  viewfuturedpro(){
    this.request.getfuturedpro().subscribe((response: any) => {
      this.Futuredpro=response.data;   
      console.log("response.data",response);
      console.log("allbrands",this.Futuredpro);
   
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
       console.log("slider.data",response.data);
      console.log("slider",this.Slider);
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
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
  selectvar(weight:any){
    this.varient_value=weight.replace(/\s/g, "")
    this.request.addvarient(this.product_id,weight).subscribe((res: any) => {
      console.log(res);
      this.varprise=res?.price_string;
      this.stocck=res?.stock;
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
  backk(){
    // this._location.back();
    this.page1=true;
    this.page2=false;
    
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
        // if (res.message == 'Product added to cart successfully') {       
        // }
        // else  {
        //   console.log("error",res);
    
        // }
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

}
