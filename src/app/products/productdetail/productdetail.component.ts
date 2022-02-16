import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service'
import { ViewportScroller } from "@angular/common";
import { windowDock } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
  providers: [NgbRatingConfig, ToastrService],
})
export class ProductdetailComponent implements OnInit {
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
  openproduct: any;
  Peoduct: any;
  choice: any;
  stocck: any;
  id: any;
  dec: any;
  totalprice: any;
  varprise: any;
  quantityyy!: number;
  cat_id: any;
  Product: any;
  varient_value: any;
  product_iddd: any;
  register!: FormGroup;
  quantityy: any;
  Relatedprod: any;
  stk: any;
  photoos: Array<object> = [];
  colors: any;
  tags: any;
  currentRate = 0;
  error1: any;
  comment!: FormGroup;
  Comments: any;
  commtotal: any;
  currentRatess: any;
  photoloader: boolean = true;
  contentloader: boolean = true;
  discriptloader: boolean = true;
  loader6: boolean = true;
  buyertypeid: any;
  prod_price: any;
  quantityyy2!: number;
  Bulckdis: any;
  discount: any;
  varientt: any;
  iswishlistt: any;
  likedd = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  likeddd = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
  showFlag: boolean = false;
  selectedImageIndex: number = -1;
  currentIndex: any;
  mainphoto: any;
  photooo: any = [
    { image: 'https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png' },
    { image: 'https://neophroncrm.com/spiceclubnew/public/uploads/all/Vcp3JrmWUsJH04QO9b14cRe0maSP03F87nsfHXaw.png' },

  ];
  newphotos: any;
  galleryphotos: any = [];
  message!: FormGroup;
  error2: any;
  allgalleryphotos: any = [];
  currenturl: any;
  productname: any;
  element!: HTMLElement;
  myvalue: any;
  valuee: any;
  error3: any;
  stocckkk: any;

  constructor(private router: Router, private request: RequestService, private route: ActivatedRoute, private formBuilder: FormBuilder, private fb: FormBuilder,
    private modalService: NgbModal, config: NgbRatingConfig, private _location: Location,private scroller: ViewportScroller,
    private toastr: ToastrService, private sharedService: SharedService) {

    config.max = 5;
    config.readonly = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    //  this.buyertypeid=this.currentdetail.user?.buyertypeid;
    if (this.userid == undefined) {
      this.userid = 0;
    }
    
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("product-id", this.id);
    this.viewproductrow(this.id);
    this.iswishlist(this.id)

    this.comment = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]],
    });

    this.message = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],

    });

    this.currenturl = this.router.url
  }
 

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      
      return false;
    }
    console.log("valueee", event.target.value);
    return true;
    
  }
  onlyNumberKey(event: { charCode: number; }) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
getValue(val:any){
if(val<=0){
  val=1
}
else if (val>this.stocckkk){
 val=this.stocckkk
}
  this.quantityyy=val
  this.stocck=this.stocckkk-val
  console.log(val);
  let dataa = {
    a: this.buyertypeid,
    b: this.product_id,
    c: this.varient_value.replace(/\s/g, ""),
    d: this.quantityyy
  }
  console.log("dataaa", dataa);
  this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
    this.totalprice = res.price;
    console.log("discount price", this.totalprice);
    console.log("dis res", res);
  })
}

filterDatatable(qty: any) {
  this.error3=''
    console.log("search",qty);
   
    if(qty>this.stocck ){
      console.log("out of stock"); 
      this.error3='out of stock'
    }
    else if (qty<=0){
      console.log("Enter minimun 1 prodect"); 
      this.error3='Enter minimun 1 prodect'
    }
  
}  


  scrolll(){
  console.log("dfgs");
  // this.scroller.scrollToAnchor("targetRed");
    // this.element = document.getElementById('shop-product__rating') as HTMLElement;
    window.scrollTo({ top:900, behavior: 'smooth'});
    // this.router.navigate([], { fragment: "sscroll" });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
}

  showLightbox(index: number) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
  toggle(img: any, index: any): void {
    this.likeddd[index] = !this.likeddd[index];
    if (this.likeddd[index] == true) {
      console.log("true , add recrd");
      this.addtowishlist(img.id);
    }
    else if (this.likeddd[index] == false) {
      console.log("false , delectrecord");
      this.deleteRecord(img.id);
    }

  }
  toggledelete(img: any, index: any): void {
    this.likedd[index] = !this.likedd[index];
    if (this.likedd[index] == true) {
      console.log("true , add recrd");
      this.addtowishlist(img.id);
    }
    else if (this.likedd[index] == false) {
      console.log("false , delectrecord");
      this.deleteRecord(img.id);
    }
  }

  addtowishlist(prd_id: any) {
    if (this.userid == 0) {
      this.toastr.info('You need to login', '');
    }
    else {
      let edata4 = {
        user_id: this.userid,
        product_id: prd_id
      }
      console.log(edata4);
      this.request.addtowishlist(edata4).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Product is successfully added to your wishlist') {
          console.log("success", res.message);
          this.iswishlist(prd_id)
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
  deleteRecord(id: any) {
    console.log("deleteeerow", id);
    this.request.deletewishproud2(id).subscribe((response: any) => {
      console.log(response);
      if (response.message == "Product is removed from wishlist") {
        console.log("deleted", response.message);
        this.iswishlist(id)
        this.deleteRecordSuccess();
        this.sharedService.sendClickEvent();
      }
      else {
        this.toastr.error(response.message);
        console.log("error ,product is not deleted")

      }

    }, (error: any) => {
      console.log(error);
    });
  }
  viewproductrow(id: any) {
    this.totalprice = 0.00
    this.product_id = id
    this.quantityyy = 0
    this.photoloader = true;
    this.contentloader = true;
    this.discriptloader = true;
    console.log("detail", this.product_id);
    // this.router.navigate(['productdetail', id]);
    window.scroll(0,0)
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      window.scroll(0,0);
      console.log("proddetaill", response);
      this.Peoduct = response.data[0];
      this.choice = this.Peoduct.choice_options;
      this.stocck = (this.Peoduct.current_stock); 1
      this.stocckkk = (this.Peoduct.current_stock); 1
      this.stk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      //  this.photoos = response.map( (item:any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.data[0].photos.path);
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.currentRatess = this.Peoduct.rating;

      this.photoloader = false;
      this.contentloader = false;
      this.discriptloader = false;
      this.productname = this.Peoduct.name;

      // array push photo
      this.newphotos = this.photoos.map((item: any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.path)

      this.newphotos.forEach((item: any) => {
        this.galleryphotos.push({ image: item });
        // this.allgalleryphotos.push({ thumbImage: item });
      })
      this.newphotos.forEach((item: any) => {
        // this.galleryphotos.push({ image: item });
        this.allgalleryphotos.push({ thumbImage: item, image: item });
        console.log("allgalleryphotos", this.allgalleryphotos);

      })
      console.log(" this.photoos", this.photoos);
      console.log("res", this.Peoduct);
      console.log("choise option", this.Peoduct.choice_options);
     
      this.getcommentsss()
      //  if(this.Peoduct.current_stock==0){
      //    console.log("stock 0");
      //    this.outofstackbtn=true;
      //    this.addcartbtn=false
      //  }
      //  else{
      //   this.outofstackbtn=false;
      //   this.addcartbtn=true
      //  }
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
      this.loader6 = false;
      console.log("res", this.Relatedprod);
      this.viewbulkdiscount(this.product_id);
      this.viewdiscount(this.product_id)
    },
      (error: any) => {
        console.log(error);
      });
  }
  viewproductrow2(id: any) {
    this.allgalleryphotos =[]
    this.totalprice = 0.00
    this.product_id = id
    this.quantityyy = 0
    this.photoloader = true;
    this.contentloader = true;
    this.discriptloader = true;
    console.log("detail", this.product_id);
     this.router.navigate(['productdetail', id]);
    window.scroll(0,0)
    this.request.getproddetail(this.product_id).subscribe((response: any) => {
      window.scroll(0,0);
      console.log("proddetaill", response);
      this.Peoduct = response.data[0];
      this.choice = this.Peoduct.choice_options;
      this.stocck = (this.Peoduct.current_stock); 1
      this.stocckkk = (this.Peoduct.current_stock); 1
      this.stk = this.Peoduct.current_stock;
      this.photoos = this.Peoduct.photos;
      //  this.photoos = response.map( (item:any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.data[0].photos.path);
      this.colors = this.Peoduct.colors;
      this.tags = this.Peoduct.tags;
      this.varprise = this.Peoduct.main_price;
      this.currentRatess = this.Peoduct.rating;

      this.photoloader = false;
      this.contentloader = false;
      this.discriptloader = false;
      this.productname = this.Peoduct.name;

      // array push photo
      this.newphotos = this.photoos.map((item: any) => 'https://neophroncrm.com/spiceclubnew/public/' + item.path)

      this.newphotos.forEach((item: any) => {
        this.galleryphotos.push({ image: item });
        // this.allgalleryphotos.push({ thumbImage: item });
      })
      this.newphotos.forEach((item: any) => {
        // this.galleryphotos.push({ image: item });
        this.allgalleryphotos.push({ thumbImage: item, image: item });
        console.log("allgalleryphotos", this.allgalleryphotos);

      })
      console.log(" this.photoos", this.photoos);
      console.log("res", this.Peoduct);
      console.log("choise option", this.Peoduct.choice_options);
     
      this.getcommentsss()
      //  if(this.Peoduct.current_stock==0){
      //    console.log("stock 0");
      //    this.outofstackbtn=true;
      //    this.addcartbtn=false
      //  }
      //  else{
      //   this.outofstackbtn=false;
      //   this.addcartbtn=true
      //  }
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
      this.loader6 = false;
      console.log("res", this.Relatedprod);
      this.viewbulkdiscount(this.product_id);
      this.viewdiscount(this.product_id)
    },
      (error: any) => {
        console.log(error);
      });
  }
  viewbulkdiscount(id: any) {
    this.request.getbulckdisc(this.buyertypeid, id).subscribe((response: any) => {
      console.log("relatedprod", response);
      this.Bulckdis = response.data;
      console.log("bulkdiscount", this.Bulckdis);
    },
      (error: any) => {
        console.log(error);
      });
  }
  viewdiscount(id: any) {
    this.request.getdisc(this.buyertypeid, id).subscribe((response: any) => {
      console.log("relatedprod", response);
      this.discount = response.data;
      console.log("discount", this.discount);
    },
      (error: any) => {
        console.log(error);
      });
  }
  firstDropDownChanged(data: any) {
    console.log(data.target.value);
    this.quantityy = data.target.value;
    return this.quantityy = this.quantityy;
  }
  addtocart(_id: any) {
   
    console.log(this.quantityyy);
    if (this.userid == 0) {
      console.log("uuuuuuuuuuuuuuiddddddddd", this.userid);

      this.toastr.info('You need to login', '');
    }
    else {
      console.log(this.quantityyy);
      
      if (this.quantityyy ==0) {
        let edata = {
          id: _id,
          variant: this?.varient_value.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: 1,
          buyertype: this.buyertypeid,
        }
        this.toastr.info('minimun 1 product should be selected', '');
        // this.addtoocartt(edata)
        console.log("edata1",edata);
      }
      else {
        this.quantityy = this.quantityyy
        console.log("qtyyyy",this.quantityy);
        let edata = {
          id: _id,
          variant: this?.varient_value.replace(/\s/g, ""),
          user_id: this.userid,
          quantity: this.quantityy,
          buyertype: this.buyertypeid,
        }
        this.addtoocartt(edata)
        console.log("edata2",edata);
      
      }
    }
  }
  addtoocartt(edata:any){
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
  increaseqty() {
    this.quantityyy++;
    this.stocck--;
    // this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
    //  this.totalprice=this.dec.toFixed(2)
    // console.log("-dec",this.dec);

    let dataa = {
      a: this.buyertypeid,
      b: this.product_id,
      c: this.varient_value.replace(/\s/g, ""),
      d: this.quantityyy
    }
    console.log("dataaa", dataa);

    this.request.getdiscountprice(this.buyertypeid, this.product_id, this.varient_value.replace(/\s/g, ""), this.quantityyy).subscribe((res: any) => {
      this.totalprice = res.price;
      console.log("discount price", this.totalprice);
      console.log("dis res", res);


    })
  }
  decreaseqty() {
    this.quantityyy--;
    this.stocck++;
    this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
    this.totalprice = this.dec.toFixed(2)
    // console.log("-quntity",this.quantityyy);
    // console.log("price",this.varprise.replace('Rs',''));
    // console.log("totalprice",this.totalprice); 
  }

  selectvar(weight: any) {
    this.varient_value = weight.replace(/\s/g, "")

    this.request.addvarient(this.product_id, weight).subscribe((res: any) => {
      console.log(res);
      this.varprise = res?.price_string;
      // this.totalprice=(res?.price_string).replace('Rs','');
      this.stocck = (res?.stock);
      this.stocckkk = (res?.stock);
      this.quantityyy = 0;

      // if (res.message == 'Product added to cart successfully') {       
      // }
      // else  {
      //   console.log("error",res);

      // }
      console.log(this.varprise);
    }, (error: any) => {
      console.log("error", error);

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
      if (res.message == 'Product added to cart successfully') {
        this.addRecordSuccess();
        console.log("done", res);
      }
      else if (res.message == 'You cannot review this product') {
        this.toastr.error(res.message);
        console.log("error", res.message);

      }
    }, (error: any) => {
      console.log("error", error);

    });

  }
  // addconv(content:any,_id:any){
  //   this.product_iidd=_id;
  //   this.modalService.open(content, {
  //     ariaLabelledBy: 'modal-basic-title',
  //     size: 'lg',
  //   });
  // }
  backk() {
    this._location.back();
    console.log("back");
  }
  getcommentsss() {
    this.request.getproductcomments(this.id).subscribe((response: any) => {
      this.Comments = response.data;
      this.commtotal = this.Comments.length
      console.log("Comments", this.Comments);
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
        console.log(this.error1)
        return;
      }
      else {
        if ((this.comment.get('rating'))?.value != Number) {
          form.value.rating = 0
          let edata2 = {
            product_id: this.product_id,
            user_id: this.userid,
            rating: form.value.rating,
            comment: form.value.comment,
          }
          console.log(edata2);
          this.request.addreview(edata2).subscribe((res: any) => {
            console.log(res);
            if (res.message == 'Comment  Submitted') {
              this.toastr.success('Comment  Submitted', '');
              this.getcommentsss();
            }
            else {
              this.toastr.error(res.message);
              console.log("error", res);

            }
          }, (error: any) => {
            console.log("error", error);
          });
        }
      }
    }
  }
  quickview(id: any, content: any) {
    // this.totalprice=''
    this.quantityyy2 = 1
    this.product_id = id
    this.request.getproddetail(this.product_id).subscribe((response: any) => {

      console.log("proddetaill", response);
      this.Peoduct = response.data[0];
      this.prod_price = this.Peoduct.main_price;
      this.choice = this.Peoduct.choice_options;
      //  this.stocck=(this.Peoduct.current_stock)-1;
      this.stk = this.Peoduct.current_stock;
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
        this.stocck = (this.Peoduct.current_stock) - 1;
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
  increaseqty2() {
    this.quantityyy2++;
    this.stocck--;
    // this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
    //  this.totalprice=this.dec.toFixed(2)
    // console.log("-dec",this.dec);
  }
  decreaseqty2() {
    this.quantityyy2--;
    this.stocck++;
    // this.dec = this.varprise.replace(/[^0-9\.]+/g, "") * this.quantityyy;
    // this.totalprice=this.dec.toFixed(2)
    // // console.log("-quntity",this.quantityyy);
    // // console.log("price",this.varprise.replace('Rs',''));
    //  console.log("totalprice",this.totalprice);

  }
  selectvar2(weight: any) {
    this.varient_value = weight.replace(/\s/g, "")
    this.request.addvarient(this.product_id, weight).subscribe((res: any) => {
      console.log(res);
      this.prod_price = res?.price_string;
      this.totalprice = (res?.price_string).replace('Rs', '');
      this.varprise = res?.price_string;
      this.stk = res?.stock;
      if (res?.stock == 0) {
        this.stocck = 0
        this.quantityyy2 = 0;

      }
      else {
        this.stocck = (res?.stock) - 1;
        this.quantityyy2 = 1;
      }

      console.log(this.varprise);
      console.log(this.stocck);
      console.log(res?.stock);

    }, (error: any) => {
      console.log("error", error);

    });
  }
  addtocart2() {
    if (this.userid == 0) {
      this.toastr.info('You need to login', '');
    }
    else {
      let edata = {
        id: this.product_id,
        variant: this.varient_value.replace(/\s/g, ""),
        user_id: this.userid,
        quantity: this.quantityyy2,
        buyertype: this.buyertypeid,
      }
      console.log(edata);

      this.request.addtocart(edata).subscribe((res: any) => {
        console.log("resssssssssssssss", res);
        if (res.message == 'Product added to cart successfully') {
          console.log("Product added to cart successfully");
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
  addconv(content: any, _id: any) {
    this.product_id = _id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  sendconv(form: FormGroup) {
    this.error2 = ''
    if (this.message.invalid) {
      console.log("empty");
      this.error2 = '* Enter requireds';
      return;
    } else {

      let edata = {
        product_id: this.product_id,
        user_id: this.userid,
        title: form.value.title,
        message: form.value.message
      }
      console.log("edata,", edata);
      this.request.addconv(edata).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Conversation created') {
          this.modalService.dismissAll();
          this.router.navigate(['/message']);
        }
        else {
          console.log("error", res);

        }
      }, (error: any) => {
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

  iswishlist(prodid: any) {
    this.request.checkwishlist(prodid, this.userid).subscribe((response: any) => {
      console.log("relatedprod", response);
      this.iswishlistt = response;

      console.log("iswishlistt", this.iswishlistt);
    },
      (error: any) => {
        console.log(error);
      });
  }

}
