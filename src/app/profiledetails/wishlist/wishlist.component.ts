import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import{ SharedService} from 'src/app/services/shared.service'
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class WishlistComponent implements OnInit {
  loader: boolean=true;
  checkedColumns = {};
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Wishlist: any;
  loadingIndicator: boolean | undefined;
  quantityy:any=1;
  detail: any;
  Peoduct: any;
  choice: any;
  stocck: any;
  stk: any;
  photoos: any;
  colors: any;
  tags: any;
  varprise: any;
  varient_value: any;
  quantityyy: any;
  dec: any;
  totalprice: any;
  product_id: any;
  prod_price: any;
  outofstackbtn: boolean=false;
  addcartbtn: boolean=true;

  buyertypeid: any;
  stocckkk: any;
  subItem: any=0;
  storked_pricee: any;
  Futuredpro: any;
  poploader: boolean=true;
  Summeryload: boolean=true;
  buynowbtn: boolean=false;
  ClickEventSubscription!: Subscription;
  
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService, 
    private modalService: NgbModal,private toastr: ToastrService, private toast: ToastrService,
    config: NgbRatingConfig,
    private sharedService: SharedService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')     
    );
    
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id;
     this.accesstoken=this.currentdetail.access_token;
     this.buyertypeid=this.currentdetail.user?.buyertypeid;
     this.tokentype=this.currentdetail.token_type;

     
    config.max = 5;
    config.readonly = true;

    if (this.userid !== 0) {
      this.ClickEventSubscription = this.sharedService.getwishlistClickEvent().subscribe(() => {
        this.viewwishlist();
      })
    }

    
   }

   ngOnInit(): void {
   this. loader=true;
    window.scroll(0,0)
    this.viewwishlist();
    this.viewfuturedpro();
      }
      viewwishlist(){
        this.request.fetchuserwishlist(this.userid).subscribe((response: any) => {
          this.Wishlist=response.data; 
          this.loader=false ;
        });
      
      }

      viewfuturedpro() {
        this.request.getfuturedpro().subscribe((response: any) => {
          console.log("Futuredpro",response);  
          this.Futuredpro = response.data;
          this.poploader = false;
          this.Summeryload=false
         
        });
      }

      deleteRecord(id:any) {
        this.request.deletewishproud(id).subscribe((response: any) => {
          if(response.message=="Product is successfully removed from your wishlist"){
            this.deleteRecordSuccess();
            this.viewwishlist();
            this.sharedService.sendWishlistEvent();
          }
          else{
            this.toastr.error( response.message);
            
          }
    
         }, (error: any) => {
           console.log(error);
         });
      }
      proddetail(id:any){
        window.scroll(0,0);
        this.router.navigate(['productdetail', id]);
      }

      addtocart1(_id:any,content:any){    
        this.totalprice=''
        this.quantityyy=1
        this.product_id=_id
        this.request.getproddetail(this.product_id).subscribe((response: any) => {
               this.Peoduct=response.data[0];
              
               this.prod_price = this.Peoduct.main_price;
               this.storked_pricee=this.Peoduct.stroked_price;

               this.choice=this.Peoduct.choice_options;
              //  this.stocck=(this.Peoduct.current_stock)-1;
               this.stk=this.Peoduct.current_stock;
               this.stocckkk=this.Peoduct.current_stock;
               this.photoos=this.Peoduct.photos;
               this.colors=this.Peoduct.colors;
               this.tags=this.Peoduct.tags;
               this.varprise=this.Peoduct.main_price;
               this.totalprice=this.Peoduct.main_price.replace('Rs','');
               if(this.Peoduct.current_stock==0){
                this.stocck=0
                
               }
               else {
                this.stocck=(this.Peoduct.current_stock)-1;
               }   
              //  window.scroll(0,0);             
              if(this.Peoduct.choice_options.length==0) { 
                this.varient_value=''
              }
              else{
                this.varient_value=this.choice[0]?.options[0];
              }
              this.subItem=0
                this.modalService.open(content, {
                  ariaLabelledBy: 'modal-basic-title',
                  size: 'md',
                });      
              
        },
         (error: any) => {
          console.log(error);
        });    
      }

      openaddcart(){
this.buynowbtn=false
      }
      openbuynow(){
        this.buynowbtn=true
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
            this.subItem=i
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
                this.quantityyy=1;
               }  
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
        this.request.addtocart(edata).subscribe((res: any) => {
      
          if (res.message == 'Product added to cart successfully') {    
            this.addRecordSuccess();
               this.modalService.dismissAll();
               this.sharedService.sendClickEvent();
          }
          else if (res.message=='Minimum 1 item(s) should be ordered'){
            this.toastr.success( res.message);
           
          }
        }, (error: any) => {
          this.toastr.error(error);
          console.log("error",error);
        
        });
      }

      addtoocartt2() {
        let edata={
          id : this.product_id,
          variant:this.varient_value.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: this.quantityyy,
          buyertype:this.buyertypeid, 
          is_buynow:1
        } 
        this.request.addtocart(edata).subscribe((res: any) => {
          console.log("buyres",res);
          
          if (res.result == true) {
            this.addRecordSuccess();
            this.modalService.dismissAll()
            this.sharedService.sendClickEvent();
            if( res.is_buynow!==0){
              const buynowId =res.is_buynow
              this.router.navigate(['/checkout',buynowId]);
            }     
          }
          else if (res.message == 'Minimum 1 item(s) should be ordered') {
            this.toastr.info(res.message);
          }
          else if (res.message == 'Stock out') {
            this.toastr.error(res.message);
          }
          else {
            console.log("error", res);
          }
        }, (error: any) => {
          console.log("error", error);
    
        });
      }

      firstDropDownChanged(data: any,_id:any)  {
        this.quantityy=data.target.value;
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

test() {
  this.toast.success("I'm a toast!", "Success!");
}


    }
    
function emptyArray(emptyArray: any) {
  throw new Error('Function not implemented.');
}

