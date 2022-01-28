import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers: [ToastrService],
})
export class WishlistComponent implements OnInit {
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
  loader: boolean=true;
  buyertypeid: any;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService, 
    private modalService: NgbModal,private toastr: ToastrService, private toast: ToastrService,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')     
    );
    
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user.id;
     this.accesstoken=this.currentdetail.access_token;
     this.buyertypeid=this.currentdetail.user?.buyertypeid;
     this.tokentype=this.currentdetail.token_type;
     console.log("currentuserid=", this.userid);
   }

   ngOnInit(): void {
    window.scroll(0,0)
    this.viewwishlist();
      }
      viewwishlist(){
        this.request.fetchuserwishlist(this.userid).subscribe((response: any) => {
          this.Wishlist=response.data; 
          this.loader=false ; 
          console.log("Wishlist",response.data); 
          // console.log("Wishlist", this.Wishlist[0].id);     
          // this. processdata()
          setTimeout(() => {
            this.loadingIndicator = false;
          }, 500);
        });
      
      }
      deleteRecord(id:any) {
        console.log("row",id);
        this.request.deletewishproud(id).subscribe((response: any) => {
          console.log(response);
          if(response.message=="Product is successfully removed from your wishlist"){
            console.log("deleted");
            this.deleteRecordSuccess();
            this.viewwishlist();
          }
          else{
            this.toastr.error( response.message);
            console.log("error ,product is not deleted")
            
          }
    
         }, (error: any) => {
           console.log(error);
         });
      }
      addtocart1(_id:any,content:any){    
        this.totalprice=''
        this.quantityyy=1
        this.product_id=_id
        this.request.getproddetail(this.product_id).subscribe((response: any) => {
         
          console.log("proddetaill",response);
               this.Peoduct=response.data[0];
               this.prod_price=this.Peoduct.main_price
               this.choice=this.Peoduct.choice_options;
              //  this.stocck=(this.Peoduct.current_stock)-1;
               this.stk=this.Peoduct.current_stock;
               this.photoos=this.Peoduct.photos;
               this.colors=this.Peoduct.colors;
               this.tags=this.Peoduct.tags;
               this.varprise=this.Peoduct.main_price;
               this.totalprice=this.Peoduct.main_price.replace('Rs','');
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
             console.log("totalprice",this.totalprice);
            
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
          console.log(res);
          if (res.message == 'Product added to cart successfully') {    
            console.log("Product added to cart successfully");
            this.addRecordSuccess();
               this.modalService.dismissAll();
          }
          else if (res.message=='Minimum 1 item(s) should be ordered'){
            this.toastr.success( res.message);
           
          }
        }, (error: any) => {
          this.toastr.error(error);
          console.log("error",error);
        
        });
      }
      firstDropDownChanged(data: any,_id:any)  {
        console.log(data.target.value);
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

