import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Options, LabelType } from 'ng5-slider';
declare var jQuery: any;

import{ SharedService} from 'src/app/services/shared.service'


@Component({
  selector: 'app-shopbyproduct',
  templateUrl: './shopbyproduct.component.html',
  styleUrls: ['./shopbyproduct.component.css'],
  providers: [NgbRatingConfig, ToastrService],

})
export class ShopbyproductComponent implements OnInit {
  sideloader1: boolean = true;
  
  poploader: boolean = true;
  imgloader: boolean = false;
  prodloader: boolean = true;

  minValue: number = 0;
  maxValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 2000 ,
    
  };
 
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
  prodid: any
  _values1 = [" 1 ", "2", " 3 ", " 4 ", " 5 ", " 6 "];
  _values2 = [" 1 ", "2", " 3 ", " 4 ", " 5 "];
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
  page1: boolean = true;
  page2: boolean = false;
  quantityy: any;
  quantityyy: number = 1
  cat_id: any;
  Allcat: any;
  loadingIndicator: boolean | undefined;
  Relatedprod: any;
  varient_value = "";
  varprise: any;
  choice: any;
  register!: FormGroup;
  product_iddd: any;
  product_iidd: any;
  message!: FormGroup;
  pagenation: any;
  pagess: any;
  stocck: any;
  searchh: any='';
  registerForm: any;
  sortForm: FormGroup;
  Bestsellpro: any;
  currentRate = 0;

  starList: boolean[] = [true, true, true, true, true];
  rating: any;
  photoos: any;
  tags: any;
  colors: any;
  stk: any;
  qtyinc: boolean = true;
  qtydec: boolean = true;

  totalprice: any;
  dec: any;
  outofstackbtn: boolean = false;
  addcartbtn: boolean = true;
  prodcount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  keyy: any;
  buyertypeid: any;
  prod_price: any;
  sideloader: boolean=true;
  maximumprize: any;
  likedd=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  likeddd=[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true];
  stocckkk: any;
  sortval: any='';
  brandd_id: any='';
  categoryy_id: any='';
  search: FormGroup;
 
  constructor(private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private modalService: NgbModal, config: NgbRatingConfig,
    private toastr: ToastrService,private sharedService: SharedService, private toast: ToastrService, private _location: Location,
    private route: ActivatedRoute) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    config.max = 5;
    config.readonly = true;


    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.buyertypeid=this.currentdetail.user?.buyertypeid;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;

    
    if(this.userid==undefined){
      this.userid=0;
     }

    this.sortForm = this.formBuilder.group({
      min: [''],
      max: [''],
      category: [''],
      brand: ['']

    });

    this.search = this.fb.group({ 
      key: [''],
      });
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this.keyy = this.route.snapshot.params['key'];
    console.log("keyyyyyyyyyyyyyy", this.keyy);
    if (this.keyy !==undefined) {
      this.filterDatatable2(this.keyy);
      this.viewbrand();
      this.viewcat();
      this.viewbestpro();
      this.maximunprice();
      // this.maxxxx();
    }
    else {
      console.log("elseeeeeeeee");   
      this.viewdata(1);
      this.viewbrand();
      this.viewcat();
      this.viewbestpro();
      this.maximunprice();
    }
    this.register = this.fb.group({
      rating: [''],
      comment: [''],
    });

    this.message = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],

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
  get f() {
    return this.register.controls;

  }
  opennn(){
    $(" #advance-filter-active-btn").on("click", () => {
      $(this).toggleClass("active");
      $("#shop-advance-filter-area").slideToggle();
    });
  }
  
  open2(){
    console.log("hii");
    var sidebarCategoryParent = $(
      ".single-filter-widget--list--category li.has-children, .single-sidebar-widget--list--category li.has-children"
    );
    sidebarCategoryParent.append('<a  class="expand-icon">+</a>');
  
    var expandIcon = $(".expand-icon");
    expandIcon.on("click",  (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      $(this).prev("ul").slideToggle();
      var htmlAfter = "-";
      var htmlBefore = "+";
  
      if ($(this).html() == htmlBefore) {
        $(this).html(htmlAfter);
      } else {
        $(this).html(htmlBefore);
      }
    });
  }
  pricerange(){
    console.log(this.brandd_id,'this.brandd_id');
    
    console.log("minValue",this.minValue);
    console.log("maxValue",this.maxValue);
    console.log("search",this.searchh);
    this.prodloader = true;

    this.request.filterdataa(this.categoryy_id,this.brandd_id,this.searchh,this.sortval,this.minValue,this.maxValue ).subscribe((response: any) => {
      console.log("response", response);
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.modalService.dismissAll();
      this.prodloader = false;
      // this.page1=false,
      // this.page2=false,
      // this.page3=true,
     
      console.log("allprod", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);

    });

  }
  viewdata(page: any) {
    this.prodloader = true;
    this.request.getallproducts(page).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      this.minValue=0
      this.maxValue=10000
      console.log("response", response);
      console.log("allproduct", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });

  }
  // getpage(url: any) {
  //   this.prodloader = true;
  //   this.request.getpage(url).subscribe((response: any) => {

  //     this.Product = response.data;
  //     this.pagenation = response.meta
  //     this.pagess = this.pagenation.links
  //     this.prodloader = false;
  //     console.log("response", response);
  //     console.log("allproduct", this.Product);
  //     setTimeout(() => {
  //       this.imgloader = true;
  //     }, 2000);
  //   });

  // }
  viewbestpro() {
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro = response.data.slice(0, 3);
      this.rating = this.Bestsellpro.rating;
      this.poploader = false;
      console.log("rating", this.rating);
      //   for(var i=0;i<=4;i++){  
      //     if(i<=data){  
      //       this.starList[i]=false;  
      //     }  
      //     else{  
      //       this.starList[i]=true;  
      //     }  
      //  }  
      console.log("best sellling", this.Bestsellpro);
    });
  }

  viewbrand() {
    this.request.getallbrands().subscribe((response: any) => {
      this.Allbrands = response.data;
      this. sideloader=false;
      this.sideloader1=false;
      
      console.log("response", response);
      console.log("Allbrands", this.Allbrands); 
    });
  }
  viewflashdeal(){
    // this.prodloader=true;
    // this.imgloader = false;
    // this.request. gettodaysdeal().subscribe((response: any) => {
    //   this.Product=response.data;
    //     this.pagenation=response?.meta   ;
    //     this.pagess=this.pagenation?.links;
    //     this.prodloader=false;
    //     console.log("allcatproduct",this.Product);
    //     setTimeout(() => {
    //       this.imgloader = true;
    //     }, 2000);
    // },
    // (error: any) => {
    //   console.log("error",error);
    // });
  }
  viewalldeal(){
    this.viewdata(1);
    // this.viewbrand();
    // this.viewcat();
    // this.viewbestpro();
  }

  viewtodaysdeal(){
    this.prodloader=true;
    this.imgloader = false;
    this.request. gettodaysdeal().subscribe((response: any) => {
      this.Product=response.data;
        this.pagenation=response?.meta   ;
        this.pagess=this.pagenation?.links;
        this.prodloader=false;
        this.minValue=0
        this.maxValue=this.maximumprize
        console.log("allcatproduct",this.Product);
        setTimeout(() => {
          this.imgloader = true;
        }, 2000);
    },
    (error: any) => {
      console.log("error",error);
    });
  }
  viewdealofday(){
    this.prodloader=true;
    this.imgloader = false;
    this.request. getdaydealpro().subscribe((response: any) => {
      this.Product=response.data;
        this.pagenation=response?.meta   ;
        this.pagess=this.pagenation?.links;
        this.prodloader=false;
        this.minValue=0
        this.maxValue=this.maximumprize
        console.log("allcatproduct",this.Product);
        setTimeout(() => {
          this.imgloader = true;
        }, 2000);
    },
    (error: any) => {
      console.log("error",error);
    });
  }
  viewdealofmonth(){
    this.prodloader=true;
    this.imgloader = false;
    this.request. getmonthdealpro().subscribe((response: any) => {
      this.Product=response.data;
        this.pagenation=response?.meta   ;
        this.pagess=this.pagenation?.links;
        this.prodloader=false;
        this.minValue=0
        this.maxValue=this.maximumprize
        console.log("allcatproduct",this.Product);
        setTimeout(() => {
          this.imgloader = true;
        }, 2000);
    },
    (error: any) => {
      console.log("error",error);
    });
  }
  maximunprice(){
  
    this.request.getmaximumprice().subscribe((response: any) => {
      this.maximumprize=response.price;
     
      // this.options.ceil=this.maximumprize;
      console.log("maximunprize",this.maximumprize);
      console.log("maximunprize",response);
      let opts: Options = {
        floor: 0,
        ceil: this.maximumprize,
        getPointerColor: ()=>{return '#cc020c'},
        getSelectionBarColor: () => {return '#cc020c'}
        };
        this.options = opts;
     
    },

    (error: any) => {
      console.log("error",error);
    });
    
  }
 
  backk() {
    // this._location.back();
    this.page1 = true;
    this.page2 = false;
  }
  getprodofcategory(id:any,page:any){
    this.prodloader=true;
    this.imgloader = false;
    // this.selectedItem=this.id;
    // this.topItem=''
    // this.subItem=''
    // console.log("selectedItem",this.selectedItem);
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
  getprodofbrand(id:any,page:any){
    this.prodloader=true;
    this.imgloader = false;
    window.scroll(0,0);
    // this.selectedItem=this.id;
    // this.topItem=''
    // this.subItem=''
    // console.log("selectedItem",this.selectedItem);
    console.log("pro link",id);
    this.request.getbrandprod(id,page).subscribe((response: any) => {
      this.Product=response.data;
        this.pagenation=response.meta   ;
        this.pagess=this.pagenation.links;
        this.prodloader=false;
        this.minValue=0
        this.maxValue=this.maximumprize
        console.log("allcatproduct",this.Product);
        setTimeout(() => {
          this.imgloader = true;
        }, 2000);
    },
   );
  }
  getprodofbrand2(id:any,i:any){
    window.scroll(0,0);
   this.brandd_id=id;
    // this.router.navigate(['shopbyproduct/brand/', id]);
    console.log("this.brandd_id",this.brandd_id);
    this.getprodofbrand(id,1)
  }
  getpage(url:any){
    this.prodloader=true;
    this.imgloader = false;
    this.request.getpage2(url,this.categoryy_id,this.brandd_id,this.sortval,this.minValue,this.maxValue).subscribe((response:any)=>{
      this.Product=response.data;
      this.pagenation=response.meta;  
      this.pagess=this.pagenation.links;
      window.scroll(0,0);
      this.prodloader=false;
      console.log("response",response);
      console.log("allproduct",this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    })
  }
  viewproductrow(img: any) {
    this.totalprice = ''
    this.product_id = img.id
    this.quantityyy = 0
    console.log("detail", this.product_id);
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      this.page1 = false;
      this.page2 = true;
      console.log("proddetaill", response);
      this.Peoduct = response.data[0];
      this.choice = this.Peoduct.choice_options;
      this.stocck = (this.Peoduct.current_stock);
      this.stk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.totalprice = this.Peoduct.main_price.replace('Rs', '');
      console.log("res", this.Peoduct);
      console.log("choise option", this.Peoduct.choice_options);
      window.scroll(0, 0);

      if (this.Peoduct.choice_options.length == 0) {
        console.log("empty");
        this.varient_value = ''
      }
      else {
        this.varient_value = this.choice[0]?.options[0];
      }
      console.log("optiooooons", this.varient_value);
    },
      (error: any) => {
        console.log(error);
      });
    this.request.getrelatedprod(this.product_id).subscribe((response: any) => {
      console.log("relatedprod", response);
      this.Relatedprod = response.data;
      console.log("res", this.Relatedprod);
    },
      (error: any) => {
        console.log(error);
      });


  }
  proddetail(id:any){
    // console.log("detail page",id);
    this.router.navigate(['productdetail', id]);
    console.log("navigate to category");
    window.scroll(0,0)
  }

  firstDropDownChanged(data: any) {
    console.log(data.target.value);
    this.quantityy = data.target.value;
    return this.quantityy = this.quantityy;
  }
  addtocart(_id: any) {
    if (this.quantityyy == 0) {
      this.quantityy = 1
    }
    else {
      this.quantityy = this.quantityyy
    }
    let edata = {
      id: _id,
      variant: this?.varient_value.replace(/\s/g, ""),
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
      else if (res.message == 'Minimum 1 item(s) should be ordered') {
        this.toastr.info(res.message);
        console.log("minimum 1");
      }
      else if (res.message == 'Stock out') {
        this.toastr.error(res.message);
        console.log("Stock out");
      }
      else {
        console.log("error", res);
      }
    }, (error: any) => {
      console.log("error", error);

    });

  }
  oncatChange(tbl_id: any) {
    this.prodloader = true;
    console.log("hiii", tbl_id.value);
    this.cat_id = tbl_id.value;
    this.page1 = true;
    this.page2 = false;
    this.request.getcatprodbyid(this.cat_id).subscribe((response: any) => {
      console.log("catprod", response);
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      console.log("res", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    },
      (error: any) => {
        console.log(error);
      });
  }
 
  viewcat() {
    this.request.getallcat().subscribe((response: any) => {
      this.Allcat = response.data;
      console.log("response", response);
      console.log("allcategory", this.Allcat);
      this.sideloader1 = false;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  addtowishlist(prd_id: any) {
    if(this.userid==0){
      this.toastr.info('You need to login', '');
    }
    else{
    let edata4 = {
      user_id: this.userid,
      product_id: prd_id
    }
    console.log(edata4);
    this.request.addtowishlist(edata4).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Product is successfully added to your wishlist') {
        console.log("success", res.message);
        this.addRecordSuccess();
        this.sharedService.sendClickEvent();
      }
      else {
        this.toastr.error(res.message);
        console.log("error", res.message);

      }
    }, (error: any) => {
      console.log("error", error);

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

  addreview(content: any, _id: any) {
    this.product_iddd = _id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

  }
  submitreview(form: FormGroup) {
    let edata2 = {
      product_id: this.product_iddd,
      user_id: this.userid,
      rating: "" + this.register.controls['rating'].value,
      comment: "" + this.register.controls['comment'].value,
    }
    console.log(edata2);
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log(res);
      if (res.result == true) {
        console.log("done", res);
        this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);
        console.log("error", res);

      }
    }, (error: any) => {
      console.log("error", error);

    });

  }
  addconv(content: any, _id: any) {
    this.product_iidd = _id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  sendconv(form: FormGroup) {
    let edata = {
      product_id: this.product_iidd,
      user_id: this.userid,
      title: form.value.title,
      message: form.value.message
    }
    console.log("edata,", edata);
    this.request.addconv(edata).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Conversation created') {
        this.toastr.success('Conversation created', '');
        this.modalService.dismissAll();
      }
      else {
        console.log("error", res);
        this.toastr.error(res.message);

      }
    }, (error: any) => {
      this.toastr.error(error.message);
      console.log("error", error);
    });

  }
  apply(form: FormGroup) {
    this.prodloader = true;
    this.brandd_id=form.value.brand,
    this.categoryy_id=form.value.category
    this.minValue= form.value.min
    this.maxValue=form.value.max
    if(form.value.brand==null){
      form.value.brand= ''
      this.brandd_id=''
    }
    if(form.value.category==null){
      form.value.category= ''
      this.categoryy_id=''
    }
    if(form.value.min==''){
      form.value.min=0
      this.minValue=0
      
    }
    if(form.value.max==''){
      form.value.max=this.maximumprize
      this.maxValue=this.maximumprize
    }
    console.log("submitted");
    console.log("submitted", form.value.category,form.value.brand, form.value.min, form.value.max);

    this.request.filterdataa3(form.value.category,form.value.brand, form.value.min, form.value.max).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.modalService.dismissAll();
      this.prodloader = false;
      
      console.log("response", response);
      console.log("allprod", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);

    });

  }
  search1(form:FormGroup,page=1){
    this.prodloader = true;
    
    this.searchh = form.value.key
    this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      console.log("response", response);
      console.log("search", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
     }
  filterDatatable(event: any) {
    this.prodloader = true;
    console.log(event.target.value)
    this.searchh = event.target.value
    this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      console.log("response", response);
      console.log("search", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
  }

  filterDatatable2(key: any) {
    this.prodloader = true;

    this.request.filtersearchdataa(key).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      console.log("response", response);
      console.log("search", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
  }
  get f1() {
    return this.sortForm.controls;
  }
  opensort(content: any) {
   
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
    });
  }
  onsortChange(val: any) {
    this.prodloader = true;
    this.sortval=val
    console.log("value", val);
    console.log("sort form", this.categoryy_id,this.brandd_id,this.searchh,val,this.minValue,this.maxValue);
     this.request.filterdataa(this.categoryy_id,this.brandd_id,this.searchh,val,this.minValue,this.maxValue).subscribe((response: any) => {
      console.log("sort response", response);
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      // this.page1=false,
      // this.page2=false,
      // this.page3=true,
      this.prodloader = false;
      console.log("sort", this.Product);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
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

}
function animateQuickView(id: any, selectedImage: any, sliderFinalWidth: number, maxQuickWidth: number, arg4: string) {
  throw new Error('Function not implemented.');
}

