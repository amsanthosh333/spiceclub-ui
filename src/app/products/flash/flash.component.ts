import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service';
import {Location} from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
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
  sortForm: FormGroup;
  Topbrands: any;
  search: FormGroup;
  key: any;
  Alldeal: any;

  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private modalService: NgbModal,config: NgbRatingConfig,private _location: Location) {
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
      this.search = this.fb.group({ 
        key: [''],
      });
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("brand id",this.id);
    this.viewprodbyflash(this.id,1); 
  }
  getallflashdeal(){
    this.request.getallflashdeal().subscribe((response: any) => {
      this.Alldeal=response.data;
      console.log("allflashdeal",this.Alldeal);
    });
  }
  viewprodbyflash(id:any,page:any,){
    this.request.getprodbyflash(id,page).subscribe((response: any) => {
      this.Product=response.data;
      this.pagenation=response.meta   
      this.pagess=this.pagenation.links
      console.log("response",response);
      console.log("allbrandproduct",this.Product);
    });
  }
  getpage(url:any){
    this.request.getpage(url).subscribe((response:any)=>{
      this.Product=response.data;
      this.pagenation=response.meta;  
      this.pagess=this.pagenation.links;
      console.log("response",response);
      console.log("allproduct",this.Product);
    })
  }
  addtowishlist(prd_id:any){
    let edata4={
      user_id:this.userid,
      product_id:prd_id
    }
    console.log(edata4);  
    this.request.addtowishlist(edata4).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Product added to cart successfully') {  
        console.log("success",res);     
      }
      else  {
        console.log("error",res);
      }
    }, (error: any) => {
      console.log("error",error);  
    });
  }
  proddetail(id:any){
    this.router.navigate(['productdetail', id]);
    console.log("navigate to brand");
  }
 
  search1(form:FormGroup,page=1){
    
    let key =form.value.key
    
    console.log(this.key);
    this.request.getbrandsearchprod(this.id,page,key).subscribe((response:any)=>{
      this.Product=response.data;
      this.pagenation=response.meta   
      this.pagess=this.pagenation.links
      console.log("response",response);
      console.log("allbrandproduct",this.Product);
    }, (error: any) => {
      console.log("error",error);
    });

    }
}

