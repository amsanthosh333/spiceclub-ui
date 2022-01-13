import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service';
import {Location} from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder,private fb: FormBuilder,
    private request: RequestService,private modalService: NgbModal,private toastr: ToastrService,
    config: NgbRatingConfig,private _location: Location) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser')||'{}')
        
      );
      console.log("currentuser details=", this.currentUserSubject);
      this.currentUser = this.currentUserSubject.asObservable();
       this.currentdetail = this.currentUserSubject.value;
       this.userid=this.currentdetail.user?.id; 
       this.accesstoken=this.currentdetail.access_token;
       this.tokentype=this.currentdetail.token_type;

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
  },
  (error: any) => {
    console.log("error",error);
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
proddetail(id:any){
  // console.log("detail page",id);
  this.router.navigate(['productdetail', id]);
  console.log("navigate to category");
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
viewcatprod(img:any,id:any,page:any,i:any){
  this. selectedItem=id;
  this.subItem='';
  this.topItem='';
 console.log("i",i); 
  this.getsubcategory(id)
  this.request.getcatprod(id,page).subscribe((response:any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("categoryproduct",this.Product);   
    this.search.reset();
    this.searchh1=true;
    this.search2=false;
  });
}
viewctopcatprod(img:any,id:any,page:any,i:any){
  this. selectedItem='';
  this.subItem='';
 this. topItem=i;
 console.log("i",i); 
  this.getsubcategory(id)
  this.request.getcatprod(id,page).subscribe((response:any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("categoryproduct",this.Product);   
    this.search.reset();
    this.searchh1=true;
    this.search2=false;
  
  });
  
}
viewsubcatprod(id:any,page:any,i:any){
  this.subsearch.reset();
  this.searchh1=false;
  this.search2=true;
  this.subItem=i;
  console.log("this.subItem",this.subItem);
console.log("subcattttttttid",id);
  this.request.getsubcatprod(id,page).subscribe((response: any) => {
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("subcategoryproduct",this.Product);
   
  });
}

search1(form:FormGroup,page=1){
    
  let key =form.value.key
  
  console.log(key);
  this.request.getcatsearchprod(this.id,page,key).subscribe((response:any)=>{
    this.Product=response.data;
    this.pagenation=response.meta   
    this.pagess=this.pagenation.links
    console.log("response",response);
    console.log("searchproduct",this.Product);
  }, (error: any) => {
    console.log("error",error);
  });

   }
   searchform2(form:FormGroup,page=1){
    
    let key =form.value.key
    
    console.log("search2",key);
    this.request.getsubcatsearchprod(this.id,page,key).subscribe((response:any)=>{
      this.Product=response.data;
      this.pagenation=response.meta   
      this.pagess=this.pagenation.links
      console.log("response",response);
      console.log("searchproduct",this.Product);
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
