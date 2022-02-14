import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service';
import {Location} from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import{ SharedService} from 'src/app/services/shared.service'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [NgbRatingConfig,ToastrService],
  
})
export class CategoryComponent implements OnInit {
  id: any;
  Product: any;
  pagenation: any;
  pagess: any;
  Allbrands: any;
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
  sortForm!: FormGroup;
  Topbrands: any;
  key: any;
  Allcat: any;
  catprod: any;
  Subcat: any;
  selectedItem: any;
  subItem:any
  search2: boolean=false;
  searchh1: boolean=true;
  search!: FormGroup;
  subsearch!: FormGroup;
  Topcat: any;
  topItem: any;
  Futurecatg: any;
  sideloader: boolean=true;
  prodloader: boolean=true;
  prodcount=[1,2,3,4,5,6,7,8,9,10];
  loader1:boolean=true;
  imgloader: boolean=false;
  quantityyy!: number;
  Peoduct: any;
  prod_price: any;
  choice: any;
  stk: any;
  photoos: any;
  colors: any;
  tags: any;
  totalprice: any;
  varprise: any;
  stocck!: number;
  varient_value!: string;
  buyertypeid: any;
  navloader: boolean=true;
  likedd=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  likeddd=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
  element!: HTMLElement;
  stocckkk: any;
  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private modalService: NgbModal,private toastr: ToastrService,
    config: NgbRatingConfig,private _location: Location,private sharedService: SharedService) {
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
    this.id = this.route.snapshot.params['id'];
    console.log("category id",this.id);
    this.viewallcategory();
    this.getprodofcategory(this.id,1);
    this.getsubcategory(this.id);
    this.viewtopcategory();
    this.viewfeatured();
    this.selectedItem=this.id;
    this.search = this.fb.group({ 
    key: [''],
    });
 
    this.subsearch = this.fb.group({ 
      key: [''],
    });
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
    
viewallcategory(){
  this.request.getallcat().subscribe((response: any) => {
    this.Allcat=response.data;
    console.log("allcategory",this.Allcat);
     window.scroll(0,0);
  },
  (error: any) => {
    console.log("error",error);
  });
}
viewtopcategory(){
  this.request.gettopcat().subscribe((response: any) => {
    this.Topcat=response.data;
    this.navloader=false
    console.log("allcategory",this.Allcat);
  },
  (error: any) => {
    console.log("error",error);
  });
}
getsubcategory(id:any){
  console.log(" id by catttttt",id); 
  this.request.getsubcategoryofcat(id).subscribe((res: any) => {
    this.Subcat=res.data;
    console.log("subcategory", this.Subcat);
    this.sideloader=false;
  }, (error: any) => {
    console.log("error",error);
  });
}
getprodofcategory(id:any,page:any){
  this.prodloader=true;
  this.imgloader = false;
  this.selectedItem=this.id;
  this.topItem=''
  this.subItem=''
  console.log("selectedItem",this.selectedItem);
  console.log("pro link",id);
  this.request.getcatprod(id,page).subscribe((response: any) => {
    this.Product=response.data;
      this.pagenation=response.meta   ;
      this.pagess=this.pagenation.links;
      this.prodloader=false;
      console.log("allcatproduct",this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
  },
  (error: any) => {
    console.log("error",error);
  });
}
getpage(url:any){
  this.prodloader=true;
  this.imgloader = false;
  window.scroll(0,0);
  this.request.getpage(url).subscribe((response:any)=>{
    this.Product=response.data;
    this.pagenation=response.meta;  
    this.pagess=this.pagenation.links;
    this.prodloader=false;
    console.log("response",response);
    console.log("allproduct",this.Product);
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
  })
}
proddetail(id:any){
  // console.log("detail page",id);
  this.router.navigate(['productdetail', id]);
  console.log("navigate to category");
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
viewcatprod(id:any,page:any,i:any){
  this.prodloader=true;
  this.imgloader = false;
  this. selectedItem=id;
  this.subItem='';
  this.topItem='';
 console.log("i",i); 
  this.getsubcategory(id)
  this.request.getcatprod(id,page).subscribe((response:any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    this.prodloader=false;
    console.log("response",response);
    console.log("categoryproduct",this.Product);   
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
    this.search.reset();
    this.searchh1=true;
    this.search2=false;
  });
}
viewcatprod2(id:any,i:any){
  window.scroll(0,0);
  this.router.navigate(['category', id]);
  console.log("category",id);
  this.viewcatprod(id,1,i)
 
}
viewctopcatprod(id:any,page:any,i:any){
  this.prodloader=true;
  this.imgloader = false;
  this. selectedItem='';
  this.subItem='';
 this. topItem=i;
 console.log("i",i); 
  this.getsubcategory(id)
  this.request.getcatprod(id,page).subscribe((response:any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links;
    this.prodloader=false;
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
    console.log("response",response);
    console.log("categoryproduct",this.Product);   
    this.search.reset();
    this.searchh1=true;
    this.search2=false;
  
  });
  
}
viewctopcatprod3(id:any,i:any){
  window.scroll(0,0);
  this.router.navigate(['category', id]);
  console.log("category",id);
  this.viewctopcatprod(id,1,i)
 
}

viewctopcatprod2(id:any,page:any,i:any){
  this.prodloader=true;
  this.imgloader = false;
  this. selectedItem='';
  this.subItem='';
 this. topItem='';
 console.log("i",i); 
 window.scroll(0,0);
  this.getsubcategory(id)
  this.request.getcatprod(id,page).subscribe((response:any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links;
    this.prodloader=false;
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
    console.log("response",response);
    console.log("categoryproduct",this.Product);   
    this.search.reset();
    this.searchh1=true;
    this.search2=false;
  
  });
  
}
viewctopcatprod4(id:any,i:any){
  window.scroll(0,0);
  this.router.navigate(['category', id]);
  console.log("subcategory",id);
  this.viewctopcatprod2(id,1,i)
}
viewsubcatprod(id:any,page:any,i:any){
  this.subsearch.reset();
  this.prodloader=true;
  this.imgloader = false;
  this.searchh1=false;
  this.search2=true;
  this.subItem=i;
  console.log("this.subItem",this.subItem);
console.log("subcattttttttid",id);
  this.request.getsubcatprod(id,page).subscribe((response: any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    this.prodloader=false;
    console.log("response",response);
    console.log("subcategoryproduct",this.Product);
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
   
  });
}
viewsubcatprod2(id:any,i:any){
  window.scroll(0,0);
  this.router.navigate(['category/subcategory', id]);
  console.log("subcategory",id);
  this.viewsubcatprod(id,1,i)
 
}

search1(form:FormGroup,page=1){
  let key =form.value.key
  this.prodloader=true;
  this.imgloader = false;
  console.log(key);
  this.request.getcatsearchprod(this.id,page,key).subscribe((response:any)=>{
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    this.prodloader=false;
    console.log("response",response);
    console.log("searchproduct",this.Product);
    setTimeout(() => {
      this.imgloader = true;
    }, 2000);
  }, (error: any) => {
    console.log("error",error);
  });
   }
   searchform2(form:FormGroup,page=1){
    
    let key =form.value.key
    this.prodloader=true;
    this.imgloader = false;
    console.log("search2",key);
    this.request.getsubcatsearchprod(this.id,page,key).subscribe((response:any)=>{
      this.Product=response.data;
      this.pagenation=response.meta   
      this.pagess=this.pagenation.links
      this.prodloader=false;
      console.log("response",response);
      console.log("searchproduct",this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    }, (error: any) => {
      console.log("error",error);
    });
     }
     viewfeatured(){
      this.request.getfuturedcat().subscribe((response: any) => {
        // this.data = data;
        // this.filteredData = data;
        this.Futurecatg=response.data;
        this.loader1=false
       
        console.log("response.data",response);
        console.log("allbrands",this.Futurecatg);
        // this.filteredData=data.response;
      
      });
  
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

     myFunction() {
      // let x = document.getElementById("myTopnav");
     
      this.element = document.getElementById('myTopnav') as HTMLElement;
      if (this.element.className === "topnav") {
        this.element.className += " responsive";
      } else {
        this.element.className = "topnav";
      }
    }
}
