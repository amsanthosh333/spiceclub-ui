import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service'
import { LoginComponent } from 'src/app/auth/login/login.component';
import { ScrollService } from 'src/app/services/scroll.service';
declare var jQuery: any;

// declare var $: any;
// import 'jqueryui';
// import  $ from 'jquery';
import * as $ from 'jquery';
@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.component.html',
  styleUrls: ['./recipedetails.component.css'],
  providers: [NgbRatingConfig, ToastrService],
})
export class RecipedetailsComponent implements OnInit {
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
  Allcat: any;
  Blogcat: any;
  rec_id: any;
  Peoduct: any;
  Comments: any;
  comment!: FormGroup;
  Blogs: any;
  blog_id: any;
  pagenation: any;
  pagess: any;
  page1: boolean = true;
  page2: boolean = false;
  currentRate: any;
  commtotal: any;
  blogdate: any;
  currentRatess: any;
  searchall!: FormGroup;
  searchbyblog!: FormGroup;
  error1: any;
  photoss: any;
  nutritional: any;
  Tags: any;
  recipeloader: boolean = true;
  prodcount = [1, 2, 3, 4, 5, 6];
  sideloader1: boolean = true;
  photoloader1: boolean = true;
  sideloader2: boolean = true;
  discrloading: boolean = true;
  discriptloader: boolean = true;
  imgloader: boolean = false;
  id: any;
  currenturl: any;
  productname: any;
  relatedrec: any;
  videoo: any;
  videourl!: SafeResourceUrl;
  allloader1: boolean=true;
  Relatedrecipes: any;
  loader2: boolean=true;
  recipecat: any;
  Bestsellpro: any;
  varient_value: any;
  selectedvar: any;
  public quantityarray: any[] = [];
  showaddbtn: any;
  currentpackagevalue: any;
  totalqty: any;
  edata: any;
  buyertypeid: any;
  loader6: boolean=true;
  likedd = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  likeddd = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  iindex: any;
  // img: any;
  likesss = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  likess = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  imgloader2: boolean=true;
  Slider: any;
  photoo: any = [];
  allgalleryphotos: any = [];
  buybtn:boolean=false
  elem1 = ".page-iframe";
 


  constructor(private scrollService: ScrollService,private sharedService: SharedService,private router: Router, private formBuilder: FormBuilder, private fb: FormBuilder,
    private route: ActivatedRoute, private request: RequestService,
     private modalService: NgbModal, private toastr: ToastrService, config: NgbRatingConfig,
      private _location: Location,public sanitizer:DomSanitizer) {

    config.max = 5;
    config.readonly = true;

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
    }


  }
  ngOnInit(): void {
    console.log("id on ng oninit");
    this.route.params.subscribe(val => {
      this.id = val['id']
      this.getrecipedetaill(this.id);
    this.getallrecipe(1);
    this.getallrecipecat();
    this.getrecipesbycatg(this.id,1)
    // this.viewfuturedpro();
    this.viewdata();

    this.comment = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]],

    });
    this.currenturl = this.router.url;
    });

    // this.id = this.route.snapshot.params['id'];
    // this.getrecipedetaill(this.id);
    // this.getallrecipe(1);
    // this.getallrecipecat();
    // this.getrecipesbycatg(this.id,1)
    // this.viewfuturedpro();
    // this.viewdata();

    // this.comment = this.fb.group({
    //   rating: ['', [Validators.required]],
    //   comment: ['', [Validators.required]],

    // });
    // this.currenturl = this.router.url;

    
    (($) => {
      $('.esg-youtube-frame').each(() =>{ 
        var src = $(this).data('src'); 
        src += "&autoplay=1"; 
        $(this).data('src',src); 
    });
    
      $('.esg-click-to-play-video').first().click() 
      // $("#offcanvas-about-icon").on("click", function () {

      //  )};
        $(' .ytp-button:not([aria-disabled=true]):not([disabled]):not([aria-hidden=true])').on("click",function(){
          console.log("query");
          alert('Does this work?');
          console.log("query");
          
      });


      $('.ytp-button').on("click",function(){
        console.log("query");
        alert('Does this work?');
        console.log("query");
        
    });
    
    $('.ytp-large-play-button').on("click",function(){
      console.log("query");
      alert('Does this work?');
      console.log("query");
      
  });

    })(jQuery);
  }

 




  scrollToElement(element: HTMLElement) {
    console.log("scroll");
    
    this.scrollService.scrollToElement(element);
  }


  uploadDone(){
    console.log("showbuybtn");
    setTimeout(() => {
      this.buybtn=true
    }, 2000);
  }
  play(){
    console.log("showbuybtn play");
  }
  viewfuturedpro(){
  
    this.request.getbestsellpro().subscribe((response: any) => { 

      this.Bestsellpro=response.data.slice(0,4);  
      this.loader6=false

    
      console.log("Bestsellpro",this.Bestsellpro);
      setTimeout(() => {
        this.imgloader2 = false;
      }, 1000);

    })

  }
  viewdata() {
    this.request.getslider().subscribe((response: any) => {
      this.Slider = response.data;
      this.photoo = this.Slider.map((item: any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.photo);
      console.log("photooo",this.photoo);
      
      // this.loader1 = false;
      // this.mainloader = false;
      setTimeout(() => {
        // this.loadingIndicator = false;
      }, 500);
    });
  }
  

  getallrecipe(page: any) {
    this.recipeloader = true;
    this.imgloader = false; 
    this.request.getallrecipe(page).subscribe((res: any) => {
      this.Blogs = res.data;
      this.pagenation = res.meta
      this.pagess = this.pagenation.links
      this.recipeloader = false;
      this.allloader1 =false
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    });
  }
  getallrecipecat() {
    this.sideloader1 = true;

    this.request.getallrecipecat().subscribe((response: any) => {
      this.Allcat = response.data;
      this.sideloader1 = false;
    },
     );
  }
  getrecipebycatg(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['/recipe'],{ queryParams:{ category:id, page: 1} });
  }
  getblogdetail2(id: any) {
    console.log("id",id);
    
    window.scroll(0, 0);
    this.router.navigate(['recipedetails', id]);
    
    
  }
  getrecipedetaill(id: any) {
    this.page1 = false;
    window.scroll(0, 0);
    this.page2 = true;
    this.sideloader2 = true;
    this.photoloader1 = true;
    this.discrloading = true;
    this.discriptloader = true;
    this.blog_id = id;
    this.request.getrecipedetail(id).subscribe((response: any) => {
    console.log("rec detail respoonse",response);
    this.allgalleryphotos = [];
      this.Peoduct = response.data[0];
      this.photoss = this.Peoduct.photos;
      this.nutritional = this.Peoduct.nutritional_fact;
      this.Tags = this.Peoduct.tags;
      this.currentRatess = this.Peoduct.rating;
      this.productname = this.Peoduct.name;
      this.recipecat= this.Peoduct.category
      this.getrecipesbycatg(this.recipecat,1)
      this.relatedrec =this.Peoduct.products;
  
      this.videoo =this.Peoduct.video_link;
      this.videourl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoo);    
      this.sideloader2 = false;

      this.discrloading = false;
      this.discriptloader = false;
      this.loader6=false
      this.imgloader2 = false;
      this.allgalleryphotos = this.photoss.map((item: any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.path);
      console.log("this.allgalleryphotos", this.allgalleryphotos);
      //  this.photoss.forEach((item: any) => {
      //   console.log("items", item);
    
      //     this.allgalleryphotos.push({
      //      'https://neophroncrm.com/spiceclubnew/public/' + item.path,
          
      //     })
       
      // })

      setTimeout(() => {
        this.photoloader1 = false;
      }, 3000);
    },
      (error: any) => {
        console.log("error", error);
      });
    this.getcommentsss();
  }
  getrecipesbycatg(id:any,page:any){
    this.recipeloader=true;
    this.imgloader = false; 
    this.request.getrecipebycat(id,page).subscribe((response: any) => {
      this.Relatedrecipes=response.data;
      this.pagenation=response.meta   
      this.pagess=this.pagenation.links;
      this.recipeloader=false; 
      this.loader2=false
      // this.page1=true;
      // this.page2=false;
      // console.log("this.Allcat",this.Allcat);
      let index = this.Allcat?.findIndex((x:any ) => x.id == id );  
      // this.router.navigate(['/recipe'],{ queryParams:{ category:this.rec_id, page: page} });
      setTimeout(() => {
        this.imgloader = true;
      }, 2000);
    },
    (error: any) => {
      console.log("error",error);
    });
  }
  getcommentsss() {
    this.request.getcomments(this.blog_id).subscribe((response: any) => {
      this.Comments = response.data;
      this.commtotal = this.Comments.length
    },
      (error: any) => {
        console.log("error", error);
      });
  }
  addcomment(form: FormGroup) {
    if (this.userid == 0) {
      this.toastr.info('You need to login', '');
    }
    else {
      this.error1 = '';
      if (this.comment.invalid) {

        if (!this.comment.get('rating')?.valid) {
          this.error1 = '*give star';
        }
        else if (!this.comment.get('comment')?.valid) {
          this.error1 = '*type some comment';
        }
        return;
      }
      else {
        if (isNaN(form.value.rating)) {
          form.value.rating = 0
        }
 
          let edata2 = {
            recipe_id: this.blog_id,
            user_id: this.userid,
            rating: form.value.rating,
            comment: form.value.comment,
          }
          this.request.addrecipecomment(edata2).subscribe((res: any) => {
            if (res.result == true) {
              this.toastr.success('Comment  Submitted', '');
              const currentRoute = this.router.url;

              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              });
            }
            else {
              this.toastr.error(res.message);

            }
          }, (error: any) => {
            console.log("error", error);

          });
        
      }
    }
  }
  backk() {
    this._location.back();

  }


  viewproductrow2(id: any) {
    // window.scroll(0, 0);
    // console.log("viewprod2", id);
  this.router.navigate(['/productdetail', id])
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
  proddetail(id:any){
    window.scroll(0,0);
    this.router.navigate(['productdetail', id]);
  }

  openlogin() {
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
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
          // this.iswishlist(prd_id)
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

  toggle1(img: any, index: any): void {
    console.log(this.userid);

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

  qtyChange(event: any, i: any, img: any) {

    if (this.quantityarray.length == 0) {
      this.quantityarray.push({ "id": img.id, "value": event.target.value });
    }
    else {
      console.log(" this.quantityarray", this.quantityarray);
      const index = this.quantityarray.findIndex(fruit => fruit.id == img.id);
      console.log("obj", index);
      if (index > -1) {
        console.log("if", index);

        this.quantityarray[index].value = event.target.value;
      }
      else {
        console.log("else", index);
        this.quantityarray.push({ "id": img.id, "value": event.target.value });
      }

    }

    console.log("this.quantityarray", this.quantityarray);
  }
  prodselectvar(weight: any, i: any, id: any, varient: any) {
    this.selectedvar = weight.replace(/\s/g, "");
    this.showaddbtn = i
    if (varient.length > 1) {
      this.currentpackagevalue = varient[1].options[0]
    }
    this.request.addvarientfromdetail(id, weight, this.currentpackagevalue).subscribe((res: any) => {
      console.log("selectvar res", res);
      this.Bestsellpro[i].stroked_price = res.stroked_price
      this.Bestsellpro[i].main_price = res.price_string
      this.Bestsellpro[i].discount_amount = res.discount_amount;
      this.Bestsellpro[i].discount_percentage = res.discount_percentage;
    }, (error: any) => {
      console.log("error", error);
    });
  }
  prodaddtocart(img: any) {
    // console.log("img", img);
    // if (this.userid == 0) {
    //   this.openlogin()
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

      if (img.variants?.length > 1) {
        this.currentpackagevalue = img?.variants[1]?.options[0]
        this.edata = {
          id: img.id,
          variant: (this.varient_value?.replace(/\s/g, "") + "-" + this.currentpackagevalue.replace(/\s/g, "")),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
      }
      else {
        this.edata = {
          id: img.id,
          variant: this.varient_value?.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: this.totalqty,
          buyertype: this.buyertypeid,
        }
      }
      this.request.addtocart(this.edata).subscribe((res: any) => {
        console.log("resssssssssssssss", res);
        if (res.result == true) {
          this.addRecordSuccess();
          this.modalService.dismissAll();
          this.sharedService.sendClickEvent();
        }
        else {
          this.toastr.info(res.message);
        }

      },
        (error: any) => {
          this.toastr.error(error);
          console.log("error", error);

        });
    // }
  }

  addtocartprod(members:any){
    console.log("members",members);
    this.request.addcart_recipeprod(members,this.id).subscribe((res: any) => {
      console.log("addcart_recipeprod res", res);
      if (res.result == true) {
        this.addRecordSuccess();
        this.sharedService.sendClickEvent();
        this.router.navigate(['/cart'])
      }
      else{
        this.toastr.success('', res.essage);
      }
     
    }, (error: any) => {
      console.log("error", error);
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
  shareinstaUrl(foodid:any) {
    window.open('https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' +
     encodeURIComponent('https://spiceclub-a8420.web.app/' + foodid));
    return false;
  }
}
