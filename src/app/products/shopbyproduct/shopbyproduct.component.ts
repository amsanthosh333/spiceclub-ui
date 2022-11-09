import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
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

import { SharedService } from 'src/app/services/shared.service'
import { LoginComponent } from 'src/app/auth/login/login.component';

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
  prodloadermain: boolean=false

  minValue: number = 0;
  maxValue: number = 10000;
  options: Options = {
    floor: 0,
    ceil: 2000,

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
  searchh: any = '';
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
  prodcount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  keyy: any;
  buyertypeid: any;
  prod_price: any;
  sideloader: boolean = true;
  maximumprize: any;
  likedd = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  likeddd = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  stocckkk: any;
  sortval: any = '';
  brandd_id: any = '';
  categoryy_id: any = '';
  search: FormGroup;
  subItem: any;
  subbbItem: any;
  headItem: any = 1;
  subItemm: any = 0;
  pagee: any = 1;
  sortvalue: any;
  mmin: any;
  maxx: any;
  storked_pricee: any;
  prod_pricee: any;
  directpage: boolean =true;
  categoryItem: any='';
  public quantityarray: any[] = [];
  selectedvar: any;
  showaddbtn: any;
  totalqty: any;
  newpageProduct: any;
  pagenum: number=1;
  pageload: boolean=true;
  sidepoploader: boolean=false;
  currentpackagevalue: any;
  edata:any;

  constructor(private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private modalService: NgbModal, config: NgbRatingConfig,
    private toastr: ToastrService, private sharedService: SharedService, private toast: ToastrService, private _location: Location,
    private route: ActivatedRoute) {

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    config.max = 5;
    config.readonly = true;


    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;

    if (this.userid == undefined) {
      this.userid = 0;
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
    
    window.scroll(0, 0);
    this.keyy = this.route.snapshot.params['key'];
    this.route.queryParams.subscribe((data2: Params) => {
      this.categoryy_id = data2['categories']
      this.brandd_id = data2['brands']
      this.minValue = data2['min']
      this.maxValue = data2['max']
      this.pagee = data2['page']
      this.sortvalue = data2['sort_key']
      this.sortval = data2['sort_key']
    })

    if (this.keyy !== undefined || this.categoryy_id !== undefined || this.brandd_id !== undefined ||
       this.minValue !== undefined || this.maxValue !== undefined) {
      this.directpage=false
      if (this.keyy !== undefined) {
        this.minValue = 0
        this.maxValue = 10000
        
        this.filterDatatable1(this.keyy);
        
      }
      else {
        this.filterDatatable2();
      }

    }
    else {
      if (this.minValue == undefined) {
        this.minValue = 0
      }
      if (this.maxValue == undefined) {

        this.maxValue = 10000
      }
      this.viewdata(this.pagee);
      this.directpage=true
    }
    this.viewbrand();
    this.viewcat();
   
    this.maximunprice();

    setTimeout(() => {
      this.viewbestpro();
    }, 3000);

    this.register = this.fb.group({
      rating: [''],
      comment: [''],
    });
    this.message = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],

    });
  }

  
  toggle(img: any, index: any): void {
    this.likeddd[index] = !this.likeddd[index];
    if (this.likeddd[index] == true) {
      this.addtowishlist(img.id);
    }
    else if (this.likeddd[index] == false) {
      this.deleteRecord(img.id);
    }

  }
  toggledelete(img: any, index: any): void {
    if (this.userid !== 0) {
      this.likedd[index] = !this.likedd[index];
    if (this.likedd[index] == true) {
      this.addtowishlist(img.id);
    }
    else if (this.likedd[index] == false) {
      this.deleteRecord(img.id);
    }
    }
    else {
      this. openlogin()
    }
    
  }
  openlogin() {
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  get f() {
    return this.register.controls;

  }
  opennn() {
    $(" #advance-filter-active-btn").on("click", () => {
      $(this).toggleClass("active");
      $("#shop-advance-filter-area").slideToggle();
    });
  }

  open2() {
    var sidebarCategoryParent = $(
      ".single-filter-widget--list--category li.has-children, .single-sidebar-widget--list--category li.has-children"
    );
    sidebarCategoryParent.append('<a  class="expand-icon">+</a>');

    var expandIcon = $(".expand-icon");
    expandIcon.on("click", (e: { preventDefault: () => void; }) => {
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
  under200(){
    this.minValue=0;
    this.maxValue=200;
    this.pricerange()
  }
  uptoto500(){
    this.minValue=200;
    this.maxValue=500;
    this.pricerange()
  }
  pricerange() {
    if (this.categoryy_id == undefined) {
      this.categoryy_id = ''
    }
    if (this.brandd_id == undefined) {
      this.brandd_id = ''
    }
    this.router.navigate(['/shopbyproduct'], { queryParams: { page: 1, categories: this.categoryy_id, brands: this.brandd_id, min: this.minValue, max: this.maxValue } });
    // this.request.filterdataa(this.categoryy_id,this.brandd_id,this.searchh,this.sortval,this.minValue,this.maxValue ).subscribe((response: any) => {
    //   this.Product = response.data;
    //   this.pagenation = response.meta
    //   this.pagess = this.pagenation.links
    //   this.modalService.dismissAll();
    //   this.prodloader = false;

    //   setTimeout(() => {
    //     this.imgloader = true;
    //   }, 2000);

    // });
  }
  viewdata(page: any) {
    this.prodloadermain=false
    this.prodloader = true;
    this.request.getallproducts(page).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloadermain=true
      this.prodloader = false;
    
      this.minValue = 0
      this.maxValue = 10000
      this.brand_id = ''
      this.categoryy_id = ''
      this.subItem = ''
      this.categoryItem=''

    for (var i = 0; i <= this.Product.length; i++) {
      this.likeddd.push(true); 
    } 
    for (var i = 0; i <= this.Product.length; i++) {
      this.likedd.push(false); 
    }
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    });

  }

  viewbestpro() {
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro = response.data.slice(0, 6);
      this.rating = this.Bestsellpro.rating;
      this.poploader = false;
    });
  }

  viewbrand() {
    this.request.getallbrands().subscribe((response: any) => {
      this.Allbrands = response.data;
      this.sideloader = false;
      this.sideloader1 = false;
      if (this.brandd_id !== undefined) {
        let index = this.Allbrands.findIndex((x: any) => x.id == this.brandd_id);
        this.subItem = index
      }

    });
  }
  viewflashdeal() {
    this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.request.getallflashdealproducts().subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response?.meta;
      this.pagess = this.pagenation?.links;
      this.prodloadermain=true
      this.prodloader = false;  
      this.minValue = 0;
      this.maxValue = this.maximumprize;
      this.subItem = ''
      this.categoryItem=''
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  viewalldeal() {
    //this.router.navigate(['/shopbyproduct'], {queryParams:{page:1,min:0,max:this.maximumprize,}});
    this.router.navigate(['/shopbyproduct'], { queryParams: { page: 1 } });
    // this.viewdata(1);

  }

  viewtodaysdeal() {
    this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.request.gettodaysdeal('').subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response?.meta;
      this.pagess = this.pagenation?.links;
      this.prodloadermain=true
      this.prodloader = false;
      
      this.minValue = 0;
      this.maxValue = this.maximumprize;
      this.subItem = ''
      this.categoryItem=''
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  viewdealofday() {
    this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.request.getdaydealpro('').subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response?.meta;
      this.pagess = this.pagenation?.links;
      this.prodloadermain=true
      this.prodloader = false;
     
      this.minValue = 0;
      this.maxValue = this.maximumprize;
      this.subItem = ''
      this.categoryItem=''
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  viewdealofmonth() {
    this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.request.getmonthdealpro('').subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response?.meta;
      this.pagess = this.pagenation?.links;
      this.prodloadermain=true;
      this.prodloader = false;
     
      this.minValue = 0;
      this.maxValue = this.maximumprize;
      this.subItem = ''
      this.categoryItem=''
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    },
      (error: any) => {
        console.log("error", error);
      });
  }
 
  maximunprice() {
    this.request.getmaximumprice().subscribe((response: any) => {
      this.maximumprize = response.price;
      // this.maxValue=this.maximumprize
      let opts: Options = {
        floor: 0,
        ceil: this.maximumprize,
        getPointerColor: () => { return '#cc020c' },
        getSelectionBarColor: () => { return '#cc020c' }
      };
      this.options = opts;

    },

      (error: any) => {
        console.log("error", error);
      });

  }

  backk() {
    this.page1 = true;
    this.page2 = false;
  }
  getprodofcategory(id: any, page: any) {
      this.router.navigate(['/shopbyproduct'], { queryParams: { page: 1,categories: id, min: 0, max: this.maximumprize, } });

  }
  getprodofbrand(id: any, page: any) {
    this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.headItem = 1
    this.request.getbrandprod(id, page).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta;
      this.pagess = this.pagenation.links;
      this.prodloadermain=true
      this.prodloader = false;
     
      this.minValue = 0
      this.maxValue = this.maximumprize
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    },
    );
  }
  getprodofbrand2(id: any, i: any) {
    this.router.navigate(['/shopbyproduct'], { queryParams: { page: 1, brands: id, min: 0, max: this.maximumprize, } });
  }

  headactive(i: any) {
    this.headItem = i

  }
  searchWithCode(event: any) {
    let index = event.target["selectedIndex"] - 1;
    this.subbbItem = index
  }

  findSso(selectedVendor: any, i: any) {

  }
  getpage(url: any) {
    if(url!==null){
      this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.request.getpage2(url, this.categoryy_id, this.brand_id, this.sortval, this.minValue, this.maxValue,).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta;
      this.pagess = this.pagenation.links;
      this.pagee = this.pagenation.current_page
      this.router.navigate(['/shopbyproduct'], { queryParams: { page: this.pagee, categories: this.categoryy_id, brands: this.brandd_id, min: this.minValue, max: this.maxValue, sort_key: this.sortval } });
      window.scroll(0, 0);
      this.prodloadermain=true
      this.prodloader = false;
     
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    })
  }
  }
  getpage1(url: any) {
    if(url!==null){
      this.prodloadermain=false
    this.prodloader = true;
    this.imgloader = false;
    this.request.getpage(url).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta;
      this.pagess = this.pagenation.links;
      this.pagee = this.pagenation.current_page;
      this.router.navigate(['/shopbyproduct'], { queryParams: { page: this.pagee } });
      window.scroll(0, 0);
      this.prodloadermain=true
      this.prodloader = false;
     
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    })
  }
  }
  viewproductrow(img: any) {
    this.totalprice = ''
    this.product_id = img.id
    this.quantityyy = 0
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      this.page1 = false;
      this.page2 = true;
      this.Peoduct = response.data[0];
      this.choice = this.Peoduct.choice_options;
      this.stocck = (this.Peoduct.current_stock);
      this.stk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.totalprice = this.Peoduct.main_price.replace('Rs', '');
      window.scroll(0, 0);

      if (this.Peoduct.choice_options.length == 0) {
        this.varient_value = ''
      }
      else {
        this.varient_value = this.choice[0]?.options[0];
      }
    },
      (error: any) => {
        console.log(error);
      });
    this.request.getrelatedprod(this.product_id).subscribe((response: any) => {
      this.Relatedprod = response.data;
    },
      (error: any) => {
        console.log(error);
      });


  }
  proddetail(id: any) {
    this.router.navigate(['productdetail', id]);
   
  }

  firstDropDownChanged(data: any) {
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
    this.request.addtocart(edata).subscribe((res: any) => {
      if (res.message == 'Product added to cart successfully') {
        this.addRecordSuccess();
        this.sharedService.sendClickEvent();
      }
      else if (res.message == 'Minimum 1 item(s) should be ordered') {
        this.toastr.info(res.message);
      }
      else if (res.message == 'Stock out') {
        this.toastr.error(res.message);
      }
      else {
      }
    }, (error: any) => {
      console.log("error", error);

    });

  }
  oncatChange(tbl_id: any) {
    this.prodloader = true;
    this.cat_id = tbl_id.value;
    this.page1 = true;
    this.page2 = false;
    this.request.getcatprodbyid(this.cat_id).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      this.prodloadermain=true
      setTimeout(() => {
        this.imgloader = true;
      },500);
    },
      (error: any) => {
        console.log(error);
      });
  }

  viewcat() {
    this.request.getallcat().subscribe((response: any) => {
      this.Allcat = response.data;
      this.sideloader1 = false;
      if (this.categoryy_id !== undefined) {
        let index = this.Allcat.findIndex((x: any) => x.id == this.categoryy_id);
        this.categoryItem = index
      }
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  addtowishlist(prd_id: any) {
    if (this.userid == 0) {
      // this.toastr.info('You need to login', '');
      this. openlogin()
    }
    else {
      let edata4 = {
        user_id: this.userid,
        product_id: prd_id
      }
      this.request.addtowishlist(edata4).subscribe((res: any) => {
        if (res.message == 'Product is successfully added to your wishlist') {
          this.addRecordSuccess();
          this.sharedService.sendWishlistEvent();
        }
        else {
          this.toastr.error(res.message);

        }
      }, (error: any) => {
        console.log("error", error);

      });
    }
  }
  deleteRecord(id: any) {
    this.request.deletewishproud2(id).subscribe((response: any) => {
      if (response.message == "Product is removed from wishlist") {
        this.deleteRecordSuccess();
        this.sharedService.sendWishlistEvent();
      }
      else {
        this.toastr.error(response.message);

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
    this.request.addreview(edata2).subscribe((res: any) => {
      if (res.result == true) {
        this.toastr.success(res.message);
      }
      else {
        this.toastr.error(res.message);

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
    this.request.addconv(edata).subscribe((res: any) => {
      if (res.message == 'Conversation created') {
        this.toastr.success('Conversation created', '');
        this.modalService.dismissAll();
      }
      else {
        this.toastr.error(res.message);

      }
    }, (error: any) => {
      this.toastr.error(error.message);
    });

  }
  apply(form: FormGroup) {
    this.prodloader = true;
    this.brandd_id = form.value.brand,
      this.categoryy_id = form.value.category
    this.minValue = form.value.min
    this.maxValue = form.value.max
    if (form.value.brand == null) {
      form.value.brand = ''
      this.brandd_id = ''
    }
    if (form.value.category == null) {
      form.value.category = ''
      this.categoryy_id = ''
    }
    if (form.value.min == '') {
      form.value.min = 0
      this.minValue = 0

    }
    if (form.value.max == '') {
      form.value.max = this.maximumprize
      this.maxValue = this.maximumprize
    }
    this.router.navigate(['/shopbyproduct'], { queryParams: { page: 1, categories: this.categoryy_id, brands: this.brandd_id, min: this.minValue, max: this.maxValue } });

  }
  search1(form: FormGroup, page = 1) {
    this.prodloader = true;

    this.searchh = form.value.key
    this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloader = false;
      this.prodloadermain=true
      this.subItem=''
      this.categoryItem=''
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    });
  }
  //  search in page
  filterDatatable(event: any) {
    this.prodloader = true;
    this.searchh = event.target.value
    this.request.filtersearchdataa(this.searchh).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloadermain=true
      this.prodloader = false;
     
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    });
  }

  // search from home
  filterDatatable1(key: any) {
    window.scroll(0,0);   
    this.prodloader = true;

    this.request.filtersearchdataa(key).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.prodloadermain=true
      this.prodloader = false;
     
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    });
  }

  filterDatatable2() {
    window.scroll(0,0);
    this.prodloader = true;
    this.modalService.dismissAll();
    if (this.categoryy_id === undefined) {
      this.categoryy_id = ''
    }
    if (this.brandd_id === undefined) {
      this.brandd_id = ''
    }
 
    this.request.filterdataa3(this.pagee, this.categoryy_id, this.brandd_id, this.minValue, this.maxValue, this.sortvalue).subscribe((response: any) => {
      this.Product = response.data;
      this.pagenation = response.meta;
      this.pagess = this.pagenation.links;
      this.headItem = 1
      this.prodloadermain=true
      this.prodloader = false;
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    });
    // this.sortForm.setValue({
    //   category:this.categoryy_id ,
    //     brand: this.brandd_id,
  
    //   });
  }
  get f1() {
    return this.sortForm.controls;
  }
  opensort(content: any) {
    this.mmin=this.minValue;
   this.maxx= this.maxValue;
    if (this.categoryy_id === undefined) {
      this.categoryy_id = ''
    }
    if (this.brandd_id === undefined) {
      this.brandd_id = ''
    }
    if (this.minValue == 0) {
      this.mmin = ''
    }
    if (this.maxValue ===this.maximumprize) {
      this.maxx = ''
    }

    this.sortForm.setValue({
      min: this.mmin ,
      max: this.maxx,
      category: this.categoryy_id ,
      brand: this.brandd_id
    })

    

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
    });
  }
  onsortChange(val: any) {
    this.prodloader = true;
    this.sortval = val
    this.router.navigate(['/shopbyproduct'], {
      queryParams: {
        page: 1, categories: this.categoryy_id,
        brands: this.brandd_id, min: this.minValue, max: this.maxValue, sort_key: val
      }
    });
  }

  quickview(id: any, content: any) {
    this.quantityyy = 0
    this.product_id = id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      this.Peoduct = response.data[0];
  
      this.prod_price = this.Peoduct.main_price;
      this.storked_pricee=this.Peoduct.stroked_price;

      this.choice = this.Peoduct.choice_options;
      //  this.stocck=(this.Peoduct.current_stock)-1;
      this.stk = this.Peoduct.current_stock;
      this.stocckkk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.totalprice=this.Peoduct.main_price.replace('Rs','');
      this.subItemm = 0
      if (this.Peoduct.current_stock == 0) {
        this.stocck = 0

      }
      else {
        this.stocck = (this.Peoduct.current_stock);
      }
      //  window.scroll(0,0);             
      if (this.Peoduct.choice_options.length == 0) {
        this.varient_value = ''
      }
      else {
        this.varient_value = this.choice[0]?.options[0];
      }

      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
      });

    },
      (error: any) => {
        console.log(error);
      });

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
    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy,).subscribe((res: any) => { 
      this.totalprice = res.price.toFixed(2);
   // this.totalprice = this.dec.toFixed(2) 
   
    })

  }
  increaseqty(){
    this.quantityyy++;
    this.stocck--;
    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      this.totalprice = res.price.toFixed(2);
    })
      }
      decreaseqty(){

        this.quantityyy--;
        this.stocck++;    
        this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {  
          this.totalprice = res.price.toFixed(2);
        })   
      }
  selectvar(weight: any, i: any) {
    this.varient_value = weight.replace(/\s/g, "")
    this.subItemm = i
    this.request.addvarient(this.product_id, weight).subscribe((res: any) => {
      this.prod_price = res?.price_string;
      this.storked_pricee=res?.stroked_price; 
      this.totalprice = (res?.price_string).replace('Rs', '');
      this.varprise = res?.price_string;
      this.stk = res?.stock;
      this.stocckkk = res?.stock;
      if (res?.stock == 0) {
        this.stocck = 0
        this.quantityyy = 0;

      }
      else {
        this.stocck = (res?.stock);
        this.quantityyy = 0;
      }

    }, (error: any) => {
      console.log("error", error);

    });
  }
  addtocart2() {
    if (this.userid == 0) {
      this. openlogin()
    }
    else {
      let edata = {
        id: this.product_id,
        variant: this.varient_value.replace(/\s/g, ""),
        user_id: this.userid,
        quantity: this.quantityyy,
        buyertype: this.buyertypeid,
      };

      this.request.addtocart(edata).subscribe((res: any) => {
        if (res.message == 'Product added to cart successfully') {
          this.addRecordSuccess();
          this.modalService.dismissAll();
          this.sharedService.sendClickEvent();
        }
        else if (res.message == 'Minimum 1 item(s) should be ordered') {
          this.toastr.success(res.message);

        }
        else if (res.message == 'Stock out') {
          this.toastr.error(res.message);
        }
      },
        (error: any) => {
          // this.toastr.error(error);
          console.log("error", error);

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

  qtyChange(event: any, i: any, img: any) {

    if (this.quantityarray.length == 0) {
      this.quantityarray.push({ "id": img.id, "value": event.target.value });
    }
    else {
      const index = this.quantityarray.findIndex(fruit => fruit.id == img.id);
      if (index > -1) {
        this.quantityarray[index].value = event.target.value;
      }
      else {
        this.quantityarray.push({ "id": img.id, "value": event.target.value });
      }

    }
  }

  prodaddtocart(img: any) {
    console.log("img.varientlength",img.variants.length);
    
    // if (this.userid == 0) {
    //   this. openlogin()
    // }
    // else {
      if (img.variants.length == 0 || img.variants[0]?.options?.length == 0) {
        console.log("empty");
        this.varient_value = ''
      }
      else if (img.variants[0]?.options?.length == 1) {
        this.varient_value = img.variants[0]?.options[0];
      }
      else {
        this.varient_value = this.selectedvar;
      }
      const index = this.quantityarray.findIndex(fruit => fruit.id == img.id);
      if (index > -1) {
        this.totalqty = this.quantityarray[index].value;
      }
      else {
        this.totalqty = 1
      }

      if( img.variants?.length > 1){
        this.currentpackagevalue= img?.variants[1]?.options[0]
        this.edata = {
          id: img.id,
          variant: (this.varient_value?.replace(/\s/g, "")+"-"+ this.currentpackagevalue.replace(/\s/g, "")),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
        console.log("edata",this.edata);
      }
      else{
        this.edata = {
          id: img.id,
          variant: this.varient_value?.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
        console.log("edata else",this.edata);
      }

      this.request.addtocart(this.edata).subscribe((res: any) => {
        console.log("addtocart resssssssssssssss", res);
        if (res.result == true) { 
          this.addRecordSuccess();
          this.modalService.dismissAll();
          this.sharedService.sendClickEvent();
        }
        else  {
          this.toastr.info(res.message);
        }
       
      },
        (error: any) => {
          this.toastr.error(error);
          console.log("error", error);

        });
    // }
  }
  bestsellingselectvar(weight: any, i: any, id: any,varient:any) {  
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.Product[i].stroked_price= res.stroked_price
       this.Product[i].main_price = res.price_string;
       this.Product[i].discount_amount = res.discount_amount;
       this.Product[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  onScrollDown(eve: any) {
    this.pagenum+=1
  const pageurl =  this.pagess[this.pagenum]
    if(pageurl.url!==null && pageurl!==undefined ){
      this.pageload=false;
    this.prodloader = true;
    this.sidepoploader=true;
    // this.imgloader = false;
    this.request.getpage(pageurl.url).subscribe((response: any) => {
      this.newpageProduct = response.data;
      this.pagenation = response.meta;
      this.pagess = this.pagenation.links;
      this.pagee = this.pagenation.current_page;
      // this.router.navigate(['/shopbyproduct'], { queryParams: { page: this.pagee } });
      // window.scroll(0, 0);
      this.Product.push(...this.newpageProduct)
      this.pageload=true;
      this.prodloader = false;
      this.sidepoploader=false;
      for (var i = 0; i <= this.Product.length; i++) {
        this.likeddd.push(true); 
      } 
      for (var i = 0; i <= this.Product.length; i++) {
        this.likedd.push(false); 
      }
      
      setTimeout(() => {
        this.imgloader = true;
      }, 500);
    })
  }

  
  }

  onScrollUp(ev: any) {
  }

}
function animateQuickView(id: any, selectedImage: any, sliderFinalWidth: number, maxQuickWidth: number, arg4: string) {
  throw new Error('Function not implemented.');
}

