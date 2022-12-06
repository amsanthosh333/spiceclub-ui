import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  Homecat: any=[];
  // mainloader:boolean=true;
  loader1: boolean = true;
  loader2: boolean = true;
  loader3: boolean = true;
  loader4: boolean = true;
  loader5: boolean = true;
  loader6: boolean = true;
  loader7: boolean=true;
  loader8: boolean=true;
  loader9: boolean=true;
  loader10: boolean=true;
  loader11: boolean=true;
  loader12: boolean=true;
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
 

  videourl!: SafeResourceUrl;
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
  imgloader3: boolean=true;
  imgloader4: boolean=true;
  imgloader5: boolean=true;
  imgloader6: boolean=true;
  imgloader7: boolean=true;
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
  tophomecat: any;
  top3id: any;
  top3name: any;
  topthirdcat: any;
  top4id: any;
  top5id: any;
  top4name: any;
  top5name: any;
  topfourthcat: any;
  topfifthcat: any;
  currentpackagevalue: any;
  edata: any;
  loaderflash: boolean=true;
  Newarrivals: any;
  loader6new: boolean=true;
  imgloader2new: boolean=true;
  ExploreScroll: boolean=true;
  featuredScroll: boolean=true;
  flashScroll: boolean=true;
  bestsellScroll: boolean=true;
  banneronScroll: boolean=true;
  videourl1!: SafeResourceUrl;
  videourl2!: SafeResourceUrl;
  recipevideo: any;
  recipe_vid1: any;
  recipe_vid2: any;
  sliderData: any=[];
  filename1: any;
  gstImageBase64: any;
  isImageSaved!: boolean;
  


  constructor(public sanitizer:DomSanitizer,private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private request: RequestService, private toastr: ToastrService, private modalService: NgbModal,
    config: NgbRatingConfig, private _location: Location, private sharedService: SharedService, private authService: AuthService) {
       window.scroll(0, 0) 
    this.loader1 = true;
    this.loader2 = true;

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
      image:['']
    },
    );

    this.subscribe = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
    });

  }
  ngOnInit(): void {
   
    this.countDown = timer(0, this.tick).subscribe(() => --this.counter);
    this.viewdata();
    // this.viewsubscribebanner();
    this.viewtodayoffer();
    // this.viewdata3();
this.viewnewarrival();
// this.viewbestsellpro();
this.viewbestsellpro(); 
    // this.viewhomeFScategory();
    // this.viewhome34category();
    // this.viewtopcategory();
    // this.viewdaydeal();
    // this.viewcategorydata();   
    // this.gethomeecat();        
    // this.viewfuturedpro();
    // this.viewflashdeal();
    // this.viewbrands();
    // this.viewdata4();
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
  banneronScrollDown(event: any) {
    if(this.banneronScroll==true){  
      this.banneronScroll = false
   
    this.gethomeecat();
    this.viewtopcategory();
    }
    
  }

  banneronScrollUp(event: any) {
  }

  bestsellScrollDown(event: any) {
    if(this.bestsellScroll==true){  
      this.bestsellScroll = false
    }
    this.viewdaydeal();
  }

  bestsellScrollUp(event: any) {
  }

  ExploreScrollDown(event: any) {
    
    if(this.ExploreScroll==true){  
      this.ExploreScroll = false
      this.viewfuturedpro();
      this.viewflashdeal();
    }
  }

  ExploreScrollUp(event: any) {
  }
  daydealScrollDown(event: any) {
    // this.gethomeecat();
  }

  daydealScrollUp(event: any) {

  }

  featuredScrollDown(event: any) {
    if(this.featuredScroll==true){  
      this.featuredScroll = false
    this.viewbrands();
    }
  }

  featuredScrollUp(event: any) {

  }

  flashScrollDown(event: any) {
    if(this.flashScroll==true){  
      this.flashScroll = false
      this.viewvideos();
    this.viewdata4();
    
    }

  }

  flashScrollUp(event: any) {
   
  }
  top1ScrollDown(event: any) {   
    // this.viewhome34category();
  }

  top1ScrollUp(event: any) {
    
  }
  top2ScrollUp(event: any) {
   
  }
  top2ScrollDown(event: any) {    
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

  fileChangeEvent(fileInput: any) {
    this.filename1=fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {             
                // console.log(img_height, img_width);
                    const imgBase64Path = e.target.result.split(',')[1];  
                    this.gstImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;              
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
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
      else if(!this.gstImageBase64 ) {
        this.error2 = '* Select image';
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
        image:this.gstImageBase64,
        imagename: null,
        image2: null,
        imagename2: null,
        image3: null,
        imagename3: null
      }
      console.log("edata",edata);
      
      this.request.sendenquiry(edata).subscribe((res: any) => {
        if (res.result == true) {
          this.btnloading1 = false;
          this.enquiryForm.reset()
          this.filename1=''
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
  openloginshopnow() {
    if (this.userid == 0) {
      this.modalService.open(LoginComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
      });
    }
    else {
      this.router.navigate(['profile']);
    }
  }
  openSignup() {
    this.modalService.open(SignupComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  // gotocategory4() {

  //   this.router.navigate(['category', 33], { queryParams: { subcategory: 34, category1: 35, subcategory1: 36 } });

    
  // }
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
      this.sliderData=[
        {photo: 'uploads/all/enCSntCC8EDj5CM074qgxvHxAolNjJc7oZaGRFOZ.jpg', redirecturl:'cart'},
         
        {photo: 'uploads/all/HLqzkiVPCtLdAK9TpDGzkJtvWKyB6UHVqNTX2Xz6.jpg',redirecturl:'wishlist'}
        , 
        {photo: 'uploads/all/5b9gt3Th8KtyCAHEQxaFb3IxyRrg7Y6w4dUZMaRI.jpg',redirecturl:'flash'}
       ,
        {photo: 'uploads/all/g6LFGMTezuc338PwnQWDBXmQpUJhKGXjvpDuS4hG.jpg',redirecturl:'combo'}
       ,
        {photo: 'uploads/all/Luf3f0zAQZB9u1ZDeEj5sWOOqV9INCbY8Ntl3TRz.jpg',redirecturl:'cart'}
       ,
        {photo: 'uploads/all/Banners/ei61XpXpZ5yJXHpSWFksH6MzDsKuzToTREXLyraT.jpg',redirecturl:'cart'}
      ]
    
      this.loader1 = false;
      this.mainloader = false;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  mainbannerClick(i:any){
  var mainredirect=  this.sliderData[i].redirecturl
  }
  viewtopcategory() {
    this.request.gettopcat().subscribe((response: any) => {
      this.Topcat = response.data;
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  gethomeecat() {
    this.request.gethomecat().subscribe((response: any) => {
      this.Homecat = response.data;
      this.loader8= false;
      setTimeout(() => {
        this.imgloader3 = false;
      }, 500);
      this.top1id = this.Homecat[0].id
      this.top2id = this.Homecat[1].id
      this.top3id = this.Homecat[2].id
      this.top4id = this.Homecat[3].id
      this.top5id = this.Homecat[4].id

      this.top1name = this.Homecat[0].name;
      this.top2name = this.Homecat[1].name;
      this.top3name = this.Homecat[2].name;
      this.top4name = this.Homecat[3].name;
      this.top5name = this.Homecat[4].name;
 
    });
  }
  
  viewhomeFScategory(){
    this.request.getcatprod(this.top1id, 1).subscribe((response: any) => {
      this.topfirstcat = response.data
      this.loader8= false;
      setTimeout(() => {
        this.imgloader3 = false;
      }, 1000);

    });
    this.request.getcatprod(this.top2id, 1).subscribe((response: any) => {
      this.topsecondcat = response.data
      this.loader9= false;
      setTimeout(() => {
        this.imgloader4 = false;
      }, 1000);

    });

  }
  viewhome34category(){
    this.request.getcatprod(this.top3id, 1).subscribe((response: any) => {
      this.topthirdcat = response.data
      this.loader10= false;
      setTimeout(() => {
        this.imgloader5 = false;
      }, 1000);
    });

    this.request.getcatprod(this.top4id, 1).subscribe((response: any) => {
      this.topfourthcat = response.data
      this.loader11= false;
      setTimeout(() => {
        this.imgloader6 = false;
      }, 1000);

    });
  
  }

  viewhome5category(){
    this.request.getcatprod(this.top5id, 1).subscribe((response: any) => {
      this.topfifthcat = response.data
      this.loader12= false;
      setTimeout(() => {
        this.imgloader7 = false;
      }, 1000);

    });
  }
  gotocategory(id:any) {
    this.router.navigate(['category', id]);
  }
  gotocategory2() {
    this.router.navigate(['category', this.top2id]);
  }
  gotocategory3() {
    this.router.navigate(['category', this.top3id]);
  }
  gotocategory4() {
    this.router.navigate(['category', this.top4id]);
  }
  gotocategory5() {
    this.router.navigate(['category', this.top5id]);
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
      this.loaderflash = false;
    });
  }

  FlashClick(id: any, i: any) {
    this.router.navigate(['flash',id]);
  }
  completed() {
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
  bannerClick(data: any, i: any,) { 
    if(data.category_id){
           this.router.navigate(['category', data.category_id]);
         }
         else if(data.product_id && data.product_id!=="" && data.product_id!==''){
          this.proddetail(data.product_id)
         }
         else if(data.redirecturl){
           window.location.href= data.redirecturl;
        //  window.location.replace(data.redirecturl);
          // window.open(data.redirecturl);
         }
         else{

         }
  }
  blogClick(i: any) {
    this.brnd_id = this.Allbrands[i].id
    this.brandnavigate(this.brnd_id)
  }

  viewbestsellpro() {
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro = response.data;
      this.loader6 = false;
      setTimeout(() => {
        this.imgloader2 = false;
      }, 300);
    });
  }
  viewnewarrival() {
    this.request.getnewarrivalpro().subscribe((response: any) => {
      this.Newarrivals = response.data;
      this.loader6new = false;
      setTimeout(() => {
        this.imgloader2new = false;
      }, 300);
    });
  }
  viewfuturedpro() {
    this.request.getfuturedpro().subscribe((response: any) => {   
      this.Futuredpro = response.data;
      this.loader7 = false;
      setTimeout(() => {
        this.imgloader2 = false;
      }, 300);
    });
  }
  viewdaydeal() {
    this.request.getdaydealpro('').subscribe((response: any) => {
      this.Daydealpro = response.data.slice(0, 5);
      setTimeout(() => {
        this.imgloader = true;
      },300);
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
  viewvideos(){
     
    this.request.getrecipevideos().subscribe((response: any) => {
      this.recipevideo = response.data;
      this.recipe_vid1= this.recipevideo[0].video_link
      this.recipe_vid2= this.recipevideo[1]?.video_link
      this.videourl1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.recipe_vid1); 
      this.videourl2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.recipe_vid2);  


      // this.loader4 = false;
     
    });
  };
  viewdata4() {
    this.request.gettestimonial().subscribe((response: any) => {
      this.Testimonial = response.data;
      // this.loader4 = false;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  proddetail(id: any) {
    // window.scroll(0, 0);
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
      // window.scroll(0, 0);
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
  newarrivalsselectvar(weight: any, i: any, id: any,varient:any) {  
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
   
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.Newarrivals[i].stroked_price = res.stroked_price;
      this.Newarrivals[i].main_price = res.price_string;
      this.Newarrivals[i].discount_amount = res.discount_amount;
      this.Newarrivals[i].discount_percentage = res.discount_percentage;
      // this.Bestsellpro[i].stroked_price = res.stroked_price;
      // this.Bestsellpro[i].main_price = res.price_string;
    }, (error: any) => {
      console.log("error", error);
    });
  }

  bestsellingselectvar(weight: any, i: any, id: any,varient:any) {  
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
   
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.Bestsellpro[i].stroked_price = res.stroked_price;
      this.Bestsellpro[i].main_price = res.price_string;
      this.Bestsellpro[i].discount_amount = res.discount_amount;
      this.Bestsellpro[i].discount_percentage = res.discount_percentage;
      // this.Bestsellpro[i].stroked_price = res.stroked_price;
      // this.Bestsellpro[i].main_price = res.price_string;
    }, (error: any) => {
      console.log("error", error);
    });
  }
    featuuresselectvar(weight: any, i: any, id: any,varient:any) {  
      this.selectedvar = weight.replace(/\s/g, "");
      this.showaddbtn = i
      if(varient.length>1){
    this.currentpackagevalue= varient[1].options[0]
      }
      else{
        this.currentpackagevalue=null
      }
      this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {

      this.Futuredpro[i].stroked_price = res.stroked_price
      this.Futuredpro[i].main_price = res.price_string
      this.Futuredpro[i].discount_amount = res.discount_amount;
      this.Futuredpro[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  topcat1selectvar(cat_index:any,weight: any, i: any, id: any,varient:any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.Homecat[cat_index].products.data[i].stroked_price = res.stroked_price
      this.Homecat[cat_index].products.data[i].main_price = res.price_string
      this.Homecat[cat_index].products.data[i].discount_amount = res.discount_amount;
      this.Homecat[cat_index].products.data[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  topcat2selectvar(weight: any, i: any, id: any,varient:any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.topsecondcat[i].stroked_price = res.stroked_price
      this.topsecondcat[i].main_price = res.price_string
      this.topsecondcat[i].discount_amount = res.discount_amount;
      this.topsecondcat[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  topcat3selectvar(weight: any, i: any, id: any,varient:any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.topthirdcat[i].stroked_price = res.stroked_price
      this.topthirdcat[i].main_price = res.price_string
      this.topthirdcat[i].discount_amount = res.discount_amount;
      this.topthirdcat[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  topcat4selectvar(weight: any, i: any, id: any,varient:any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient?.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, this.selectedvar,this.currentpackagevalue).subscribe((res: any) => {
      this.topfourthcat[i].stroked_price = res.stroked_price
      this.topfourthcat[i].main_price = res.price_string
      this.topfourthcat[i].discount_amount = res.discount_amount;
      this.topfourthcat[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }

  topcat5selectvar(weight: any, i: any, id: any,varient:any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if(varient?.length>1){
  this.currentpackagevalue= varient[1].options[0]
    }
    else{
      this.currentpackagevalue=null
    }
    this.request.addvarientfromdetail(id, weight,this.currentpackagevalue).subscribe((res: any) => {
      this.topfifthcat[i].stroked_price = res.stroked_price
      this.topfifthcat[i].main_price = res.price_string
      this.topfifthcat[i].discount_amount = res.discount_amount;
      this.topfifthcat[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }

  prodaddtocart(img: any) {
    // if (this.userid == 0) {
    //   this.openlogin()
    // }
    // else {
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
      if( img.variants?.length > 1){
        this.currentpackagevalue= img?.variants[1]?.options[0]
        this.edata = {
          id: img.id,
          variant: (this.varient_value?.replace(/\s/g, "")+"-"+ this.currentpackagevalue.replace(/\s/g, "")),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
      }
      else{
        this.edata = {
          id: img.id,
          variant: this.varient_value?.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
      }

      this.request.addtocart(this.edata).subscribe((res: any) => {   
        console.log("addtocart res",res);
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

  backk() {
    // this._location.back();
    this.page1 = true;
    this.page2 = false;
  }
  gotodeals() {
    this.router.navigate(['/daydeal']);
    // window.scroll(0, 0)
  }
  addtocart(_id: any) {

    // if (this.userid == 0) {
    //   // this.toastr.info('You need to login', '');
    //   this.openlogin()
    // }
    // else {
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
    // }
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
          // this.sharedService.sendClickEvent();
          this.sharedService.sendWishlistEvent();
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
        this.sharedService.sendWishlistEvent();
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
    // window.scroll(0, 0);
    this.router.navigate(['brands', id]);

  }

  viewcategorydata() {
    this.request.getallcat().subscribe((response: any) => {
      this.Allcat = response.data;

      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  catnavigate(id: any) {
    // window.scroll(0, 0);
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
    // if (this.userid == 0) {
    //   this.openlogin()
    // }
    // else {
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
    // }
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



