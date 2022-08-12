import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { Pipe, PipeTransform } from "@angular/core";

declare var jQuery: any;
@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../assets/revolution/css/settings.css', '../../../assets/revolution/css/navigation.css', '../../../assets/revolution/custom-setting.css'],
  providers: [ToastrService],

})
export class HomeComponent implements OnInit {
  countDown: any;
  counter = 1800;
  tick = 1000;

  registerForm!: FormGroup;
  mainloader: boolean = true;
  Slider: any;
  loadingIndicator: boolean | undefined;
  Futurecatg: any;
  opencat: any;
  FeaturePro: any;
  page1: boolean = true;
  page2: boolean = false;
  openproduct: any;
  Peoduct: any;
  page3: boolean = false;
  Banners: any;
  Todaysdeal: any;
  sliddder: any;
  imggg = 'https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png'
  Bestsellpro: any;
  Futuredpro: any;
  photoo: any = [];
  // photooo:any = [
  //   "https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png",
  //   "https://neophroncrm.com/spiceclubnew/public/uploads/all/Vcp3JrmWUsJH04QO9b14cRe0maSP03F87nsfHXaw.png"
  // ];
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
  loader1: boolean = true;
  loader2: boolean = true;
  loader3: boolean = true;
  loader4: boolean = true;
  loader5: boolean = true;
  loader6: boolean = true;

  checkedColumns = {};
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;

  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  Wishlist: any;
  quantityyy: any;
  buyertypeid: any;
  prod_price: any;
  stk: any;
  photoos: any;
  totalprice: any;
  loadingg: boolean = true;
  myCompOneObj: any;
  Todaysoffer: any;


  photooobann: any = [
    { image: 'assets/images/banners/ban1.jpeg' },
    { image: 'assets/images/banners/ban2.jpeg' },
    { image: 'assets/images/banners/ban3.jpeg' }
  ];


  imageObject: any = [
    {
      "thumbImage": "assets/images/banners/ban1.jpeg", "title": "title of image"
    },

    {
      "thumbImage": "assets/images/banners/ban2.jpeg", "title": "title xdfgvxvs dfv of image"
    },
    {
      "thumbImage": "assets/images/banners/ban3.jpeg", "title": "title of image"
    },
    {
      "thumbImage": "assets/images/banners/ban3.jpeg", "title": "title of image"
    },
    {
      "thumbImage": "assets/images/banners/ban1.jpeg", "title": "title of image"
    },
    {
      "thumbImage": "assets/images/banners/ban2.jpeg", "title": "title sdefxcvsdv sdgsdvof image"
    },
    {
      "thumbImage": "assets/images/banners/ban3.jpeg", "title": "title of image"
    },
    {
      "thumbImage": "assets/images/banners/ban3.jpeg", "title": "title of image"
    },
  ]

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 3,
    "dots": true,
    "infinite": true
  };
  sliderAutoSlide: Boolean = true;
  @Input('liked') liked = true
  @Output() likedChange: EventEmitter<boolean> = new EventEmitter();
  likedd = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  likeddd = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  iindex: any;
  img: any;
  likesss = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  likess = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  prd_id: any;
  brnd_id: any;
  imgloader: boolean = true;
  imgloader2: boolean = true;
  stocckkk!: number;
  subItem: any = 0;
  storked_pricee: any;
  Testimonial: any;
  subscribebanner: any;
  Bestsellpro1: any;
  Daydealpro: any;
  error2: any;
  btnloading: boolean = false;
  quickreg: boolean = false;
  Topcat: any;
  enquiryForm: FormGroup;
  btnloading1: boolean = false;
  selectedvar: any;
  showaddbtn: any;
  quantityinput: any;
  public quantityarray: any[] = [];

  prdindex: any;
  quantityarray1!: void;
  totalqty: any;
  subscribe: FormGroup;
  error: any;
  top1id: any;
  topfirstcat: any;
  top1name: any;
  top2id: any;
  top2name: any;
  topsecondcat: any;
  oldBestsellpro: any;
  parentbesrsellpro: Array<any> = [];
  parentbesrsell: any;
  Flashdeal: any;
  Flashphotos: any = [];


  constructor(private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private toastr: ToastrService, private modalService: NgbModal,
    config: NgbRatingConfig, private _location: Location, private sharedService: SharedService, private authService: AuthService) {

    this.loader1 = true;
    this.loader2 = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    // console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;

    if (this.userid == undefined) {
      this.userid = 0;
      this.quickreg = true;
    }

    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)],],
      businessname: ['', Validators.required],
      // buyer_type: ['', Validators.required],
    });
    this.enquiryForm = this.formBuilder.group({
      enqfor: ['', [Validators.required]],
      title: ['', [Validators.required]],
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)],],
      comments: ['', Validators.required],
    },
    );

    this.subscribe = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
    });

  }
  ngOnInit(): void {

    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);

    setTimeout(() => {
      this.loadingg = false;
    }, 2000);
    this.viewdata();
    this.viewsubscribebanner();
    this.viewtodayoffer();
    this.viewdata3();
    this.viewbestsellpro();
    this.viewtopcategory();
    this.viewdaydeal();
    this.viewcategorydata();
    this.gethomeecat();
    this.viewfuturedpro();
    this.viewflashdeal();
    this.viewbrands();
    this.viewdata4();

    this.register = this.fb.group({
      rating: [''],
      comment: [''],

    });

    (($) => {

    })(jQuery);

  }
  ngOnDestroy() {
    this.countDown = null;
  }
  onSubmit() {
    this.btnloading = true;
    this.error2 = '';
    if (this.registerForm.invalid) {
      this.error2 = '* Enter all details';
      this.toastr.info(this.error2);
      this.btnloading = false;
      return;
    } else {
      let edata = {
        name: "" + this.registerForm.controls['fname'].value,
        email: "" + this.registerForm.controls['email'].value,
        phone: "" + this.registerForm.controls['Mobile'].value,
        business_name: "" + this.registerForm.controls['businessname'].value,

      }
      this.authService.Quickregister(edata).subscribe(
        (res: any) => {
          if (res.result == true) {
            this.toastr.success('You can login with OTP ', 'Registered Successfully');
            this.btnloading = false;
            this.registerForm.reset()
          }
          else if (res.result == false) {
            this.error2 = res.message
            this.toastr.info(this.error2);
            this.btnloading = false;
          }
          else {
            this.error2 = res.message;
            this.toastr.info(this.error2);
            this.btnloading = false;
          }
        },
      );
    }
  }
  enqueryonSubmit() {
    this.btnloading1 = true;
    this.error2 = '';
    if (this.userid < 0) {
      this.toastr.info('Please login to enquiry', '');
    }
    else if (this.enquiryForm.invalid) {
      if (!this.enquiryForm.get('mobile')?.valid) {
        this.error2 = '* Enter valid mobile number';
      }
      else if (!this.enquiryForm.get('email')?.valid) {
        this.error2 = '* Enter valid emailid ';
      }
      else {
        this.error2 = '* Enter all details';
      }
      this.toastr.info(this.error2);
      this.btnloading1 = false;
      return;
    }
    else {
      let edata = {
        user_id: this.userid,
        enqfor: "" + this.enquiryForm.controls['enqfor'].value,
        product: "" + this.enquiryForm.controls['title'].value,
        name: "" + this.enquiryForm.controls['name'].value,
        email: "" + this.enquiryForm.controls['email'].value,
        phone: "" + this.enquiryForm.controls['mobile'].value,
        comments: "" + this.enquiryForm.controls['comments'].value,
        product_description: null,
        image: null,
        imagename: null,
        image2: null,
        imagename2: null,
        image3: null,
        imagename3: null
      }
      this.request.sendenquiry(edata).subscribe((res: any) => {
        if (res.result == true) {
          this.btnloading1 = false;
          this.enquiryForm.reset()
          this.toastr.success('Submited Successfully', '');
          this.modalService.dismissAll();
        }
        else {
          this.toastr.info('Something went wrong', '');
          this.btnloading1 = false;
        }
      }, (error: any) => {
        this.btnloading1 = false;
        this.toastr.info('Something went wrong', '');
      });
    }
  }
  mailsubscribe(form: FormGroup) {
    this.error = '';
    if (this.subscribe.invalid) {
      this.error = '* Enter valid email';
      this.toastr.info(this.error);
      return;
    } else {
      let edata = {
        email: form.value.mail
      };
      this.request.emailsubscribe(edata).subscribe((res: any) => {
        if (res.result == true) {
          this.toastr.success(res.message);
          this.subscribe.reset();
        }
        else {
          this.toastr.info(res.message);
          this.subscribe.reset();
        }
      });
    }
  }
  openlogin() {
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  openloginshopnow(){  
    if (this.userid == 0) {
      this.modalService.open(LoginComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
      });
     }
    else{
      this.router.navigate(['profile']);
    }   
  }
  openSignup() {
    this.modalService.open(SignupComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  gotocategory4() {

    this.router.navigate(['category', 33], { queryParams: { subcategory: 34, category1: 35, subcategory1: 36 } });

    // category/33?subcategory=34&category1=35&subcategory1=36
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
    this.likedd[index] = !this.likedd[index];
    if (this.likedd[index] == true) {
      this.addtowishlist(img.id);
    }
    else if (this.likedd[index] == false) {
      this.deleteRecord(img.id);
    }
  }
  toggle1(img: any, index: any): void {
    this.likesss[index] = !this.likesss[index];
    if (this.likesss[index] == true) {
      this.addtowishlist(img.id);
    }
    else if (this.likesss[index] == false) {
      this.deleteRecord(img.id);
    }

  }
  toggledelete1(img: any, index: any): void {

    if (this.userid !== 0) {
      this.likess[index] = !this.likess[index];

      if (this.likess[index] == true) {
        this.addtowishlist(img.id);
      }
      else if (this.likedd[index] == false) {
        this.deleteRecord(img.id);
      }
    }
    else {
      this.openlogin()
    }
  }
  clickme() {
    this.sharedService.sendClickEvent();
  }
  viewdata() {
    this.request.getslider().subscribe((response: any) => {
      this.Slider = response.data;
      this.photoo = this.Slider.map((item: any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.photo);
      this.loader1 = false;
      this.mainloader = false;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  viewtopcategory() {
    this.request.gettopcat().subscribe((response: any) => {
      this.Topcat = response.data;
      this.top1id = this.Topcat[10].id
      this.top2id = this.Topcat[5].id
      this.top1name = this.Topcat[10].name;
      this.top2name = this.Topcat[5].name;
      this.request.getcatprod(this.top1id, 1).subscribe((response: any) => {
        this.topfirstcat = response.data

      });
      this.request.getcatprod(this.top2id, 1).subscribe((response: any) => {
        this.topsecondcat = response.data

      });
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  gotocategory() {
    this.router.navigate(['category', this.top1id]);
  }
  gotocategory2() {
    this.router.navigate(['category', this.top2id]);
  }
  gotocategoryproduct(id: any) {
    this.router.navigate(['category', id]);
  }
  viewtodayoffer() {
    this.request.gettodaysoffer().subscribe((response: any) => {
      this.Todaysoffer = response.data.slice(0, 4);
      this.loader4 = false;
    });
  }
  viewflashdeal() {
    this.request.getflashdeals().subscribe((response: any) => {
      this.Flashdeal = response.data.slice(0, 4);
      this.loader4 = false;  
    });
  }

  FlashClick(id:any,i:any){
    this.router.navigate(['flash', id]);

  }
  completed() {
    console.log('teste');
  }
  viewsubscribebanner() {
    this.request.getsubscribebanner().subscribe((response: any) => {
      this.subscribebanner = response.data[0];
      this.loader4 = false;
    });
  }
  imageClick(i: any) {
    this.prd_id = this.Todaysoffer[i].product_id,
      this.proddetail(this.prd_id)

  }
  bannerClick(id: any, i: any) {
    if (i == 0) {
      this.router.navigate(['flash']);
    }
    else if (i == 1) {
      this.router.navigate(['category',97]);
    }
    else if (i == 2) {
      this.router.navigate(['category',99]);
    }
    else {
      this.proddetail(id)
    }
  }
  blogClick(i: any) {
    this.brnd_id = this.Allbrands[i].id
    this.brandnavigate(this.brnd_id)
  }

  viewbestsellpro() {
    this.request.getbestsellpro().subscribe((response: any) => {
      // this. oldBestsellpro = response.data;
      // this.parentbesrsell = response;
      // this.parentbesrsellpro= this.parentbesrsell.data

      this.Bestsellpro = response.data;
      this.loader3 = false;
      setTimeout(() => {
        this.imgloader = false;
      }, 3000);
    });
  }
  viewfuturedpro() {
    this.request.getfuturedpro().subscribe((response: any) => {
      this.Futuredpro = response.data;
      this.loader6 = false;
      setTimeout(() => {
        this.imgloader2 = false;
      }, 3000);
    });
  }
  viewdaydeal() {
    this.request.getdaydealpro('').subscribe((response: any) => {
      this.Daydealpro = response.data.slice(0, 5);
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
  }
  gethomeecat() {
    this.request.gethomecat().subscribe((response: any) => {
      this.Homecat = response.data;
      this.loader2 = false;
    });
  }
  openquick(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
  viewdata3() {
    this.request.getbanner().subscribe((response: any) => {
      this.Banners = response.data;
      this.loader4 = false;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  viewdata4() {
    this.request.gettestimonial().subscribe((response: any) => {
      this.Testimonial = response.data;
      // this.loader4 = false;
      // setTimeout(() => {
      //   this.loadingIndicator = false;
      // }, 500);
    });
  }
  proddetail(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['productdetail', id]);
  }
  viewproductrow(img: any) {

    this.product_id = img.id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      this.page1 = false;
      this.page2 = true;
      this.Peoduct = response.data[0];
      this.choice = this.Peoduct.choice_options;
      this.stocck = this.Peoduct.current_stock;
      this.stocckkk = this.Peoduct.current_stock;
      this.photoo = this.Peoduct.photos
      this.colors = this.Peoduct.colors
      this.tags = this.Peoduct.tags
      this.varprise = this.Peoduct.main_price
      window.scroll(0, 0);
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

  selectbestsell() {
  }
  bestsellingselectvar(weight: any, i: any, id: any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    this.request.addvarient(id, weight).subscribe((res: any) => {


      this.Bestsellpro[i].stroked_price = res.stroked_price;
      this.Bestsellpro[i].main_price = res.price_string;
      // this.Bestsellpro[i].stroked_price = res.stroked_price;
      // this.Bestsellpro[i].main_price = res.price_string;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  featuuresselectvar(weight: any, i: any, id: any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    this.request.addvarient(id, this.selectedvar).subscribe((res: any) => {

      this.Futuredpro[i].stroked_price = res.stroked_price
      this.Futuredpro[i].main_price = res.price_string
    }, (error: any) => {
      console.log("error", error);
    });
  }
  topcat1selectvar(weight: any, i: any, id: any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    this.request.addvarient(id, weight).subscribe((res: any) => {
      this.topfirstcat[i].stroked_price = res.stroked_price
      this.topfirstcat[i].main_price = res.price_string
    }, (error: any) => {
      console.log("error", error);
    });
  }
  topcat2selectvar(weight: any, i: any, id: any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    this.request.addvarient(id, weight).subscribe((res: any) => {
      this.topsecondcat[i].stroked_price = res.stroked_price
      this.topsecondcat[i].main_price = res.price_string
    }, (error: any) => {
      console.log("error", error);
    });
  }

  prodaddtocart(img: any) {
    if (this.userid == 0) {
      // this.toastr.info('You need to login', '');
      this.openlogin()
    }
    else {

      if (img.variants.length == 0 || img.variants[0]?.options?.length == 0) {
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

      let edata = {
        id: img.id,
        variant: this.varient_value?.replace(/\s/g, ""),
        user_id: this.userid,
        quantity: this.totalqty,
        buyertype: this.buyertypeid,
      }
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
          console.log("Stock out");
        }
      },
        (error: any) => {
          this.toastr.error(error);
          console.log("error", error);

        });
    }
  }

  backk() {
    // this._location.back();
    this.page1 = true;
    this.page2 = false;
  }
  gotodeals() {
    this.router.navigate(['/daydeal']);
    window.scroll(0, 0)
  }
  addtocart(_id: any) {

    if (this.userid == 0) {
      // this.toastr.info('You need to login', '');
      this.openlogin()
    }
    else {
      let edata = {
        id: _id,
        variant: this.varient_value.replace(/\s/g, ""),
        user_id: this.userid,
        quantity: this.quantityyy,
        buyertype: this.buyertypeid,
      }


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
          this.toastr.error(error);

        });
    }
  }
  addtowishlist(prd_id: any) {
    if (this.userid == 0) {
      this.openlogin()
    }
    else {
      let edata4 = {
        user_id: this.userid,
        product_id: prd_id
      }
      this.request.addtowishlist(edata4).subscribe((res: any) => {
        if (res.message == 'Product is successfully added to your wishlist') {

          this.addRecordSuccess();
          this.sharedService.sendClickEvent();

        }
        else {
          this.toastr.success('', res.message);

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
        this.sharedService.sendClickEvent();
      }
      else {
        this.toastr.error(response.message);

      }

    }, (error: any) => {
      console.log(error);
    });
  }


  viewbrands() {
    this.request.getallbrands().subscribe((response: any) => {
      this.Allbrands = response.data;

      this.page1 = true,
        this.page2 = false,
        this.loader5 = false
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  brandnavigate(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['brands', id]);

  }

  viewcategorydata() {
    this.request.getallcat().subscribe((response: any) => {
      this.Allcat = response.data;
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

      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  catnavigate(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['category', id]);

  }

  quickview(id: any, content: any) {
    // this.totalprice=''
    this.quantityyy = 0
    this.product_id = id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      this.Peoduct = response.data[0];

      this.prod_price = this.Peoduct.main_price;
      this.storked_pricee = this.Peoduct.stroked_price;

      this.choice = this.Peoduct.choice_options;
      //  this.stocck=(this.Peoduct.current_stock)-1;
      this.stk = this.Peoduct.current_stock;
      this.stocckkk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.totalprice = this.Peoduct.main_price.replace('Rs', '');
      this.subItem = 0
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

    if (val <= 0) {
      val = 1

    }
    else if (val > this.stocckkk) {
      val = this.stocckkk

    }
    this.quantityyy = val
    this.stocck = this.stocckkk - val

    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      this.totalprice = res.price.toFixed(2);

      // this.totalprice = this.dec.toFixed(2) 

    })

  }
  increaseqty() {
    this.quantityyy++;
    this.stocck--;
    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      this.totalprice = res.price.toFixed(2);

      // this.totalprice = this.dec.toFixed(2) 

    })
  }
  decreaseqty() {

    this.quantityyy--;
    this.stocck++;
    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      this.totalprice = res.price.toFixed(2);

      // this.totalprice = this.dec.toFixed(2) 

    })
  }
  selectvar(weight: any, i: any) {
    this.varient_value = weight.replace(/\s/g, "")
    this.subItem = i
    this.request.addvarient(this.product_id, weight).subscribe((res: any) => {

      this.prod_price = res?.price_string;
      this.storked_pricee = res?.stroked_price;

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
      this.openlogin()
    }
    else {
      let edata = {
        id: this.product_id,
        variant: this.varient_value.replace(/\s/g, ""),
        user_id: this.userid,
        quantity: this.quantityyy,
        buyertype: this.buyertypeid,
      }
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
          this.toastr.error(error);


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
function animateQuickView(id: any, selectedImage: any, finalWidth: number, maxQuickWidth: number, arg4: string) {
  throw new Error('Function not implemented.');
}



