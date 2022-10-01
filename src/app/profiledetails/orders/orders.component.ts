import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { windows } from 'ngx-bootstrap-icons';
import { HostListener } from '@angular/core';
import { Location } from "@angular/common";
import { PlatformLocation } from '@angular/common'
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [ToastrService],
})

export class OrdersComponent implements OnInit {
  currentRate = 0;
  loader: boolean = true;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  Orders: any;
  prdid: any;
  Items: any;
  Detail: any;
  loadingIndicator: boolean | undefined;
  page2: boolean = true;
  page1: boolean = false;
  product_iddd: any;
  register!: FormGroup;
  _values2 = [" 1 ", "2", " 3 ", " 4 ", " 5 "];
  buyertypeid: any;
  username: any;
  userphone: any;
  useremail: any;

  pagenation: any;
  pagess: any;
  Sort = [
    { id: '', value: 'All' },
    { id: 'paid', value: 'Paid' },
    { id: 'unpaid', value: 'Unpaid' },

  ];
  Sort2 = [
    { id: '', value: 'All' },
    { id: 'confirmed', value: 'Confirmed' },
    { id: 'picked_up', value: 'Picked Up' },
    { id: 'on_the_way', value: 'On The Way' },
    { id: 'delivered', value: 'Delivered' },


  ];
  sortval: any;
  deliveryy: any = '';
  paymentt: any = '';
  label1: any = "Payment status";
  label2: any = "Delivery status";
  currentpage: any;
  pagee: any;
  error1: any;
  loadingg: boolean=false;
  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal,
    private authService: AuthService, private fb: FormBuilder, private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService, private route: ActivatedRoute,
    private sharedService: SharedService
   ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user.id;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.username = this.currentdetail.user.name;
    this.userphone = this.currentdetail.user.phone;
    this.useremail = this.currentdetail.user.email;

   
  }
  

  ngOnInit(): void {

    this.pagee = this.route.snapshot.params['page'];
    console.log("pagee data",this.pagee);
    this.route.queryParams.subscribe((data2:Params)=>{
      console.log("queryParams data",data2);
      this.deliveryy=data2['delivery_status']
      this.paymentt=data2['payment_status']
      console.log("this.deliveryy data",this.deliveryy);
      console.log(" this.paymentt data", this.paymentt);
          })

    if (this.pagee === undefined) {
      this.pagee = 1
    }
    
    if (this.deliveryy === undefined) {
      this.deliveryy = ''
    }
    if (this.paymentt === undefined) {
      this.paymentt = ''
    }
    console.log("this.deliveryy data",this.deliveryy);
    console.log(" this.paymentt data", this.paymentt);

    window.scroll(0, 0)
    this.getorders();

    this.register = this.fb.group({
      rating: [''],
      comment: [''],

    });
  }
  get f() {
    return this.register.controls;

  }
  getorders() {
    console.log("getorders");

    this.request.fetchOrders4(this.userid, this.pagee,this.deliveryy,this.paymentt).subscribe((response: any) => {
      console.log("getorders response ",response);
      this.Orders = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.currentpage = this.pagenation.current_page
      this.loader = false;
      // this.router.navigate(['orders', this.currentpage]);       
    });
  }
  getpage(url: any) {
    // this.loader=true;
    this.request.getpage3(url, this.deliveryy, this.paymentt).subscribe((response: any) => {
      console.log(response);

      this.Orders = response.data;
      this.pagenation = response.meta;
      this.pagess = this.pagenation.links;
      this.currentpage = this.pagenation.current_page
      this.pagee=this.pagenation.current_page
      window.scroll(0, 0);
      // this.router.navigate(['orders', this.currentpage]);
      this.router.navigate(['/orders', this.currentpage], {queryParams:{delivery_status:this.deliveryy,payment_status:this.paymentt}});

    })
  }

  onsortChange(val: any, label1: any) {
    this.loader = true;
    this.paymentt = val
    this.label1 = label1
    console.log(this.paymentt);

    this.request.fetchOrders2(this.userid, this.deliveryy, this.paymentt).subscribe((response: any) => {
      this.Orders = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.loader = false;
      console.log(response); 
       this.router.navigate(['/orders', 1], {queryParams:{delivery_status:this.deliveryy,payment_status:this.paymentt}});
    });

  }
  onsortChange2(val: any, label2: any) {
    this.loader = true;
    this.deliveryy = val
    this.label2 = label2
    console.log(this.deliveryy);
    this.request.fetchOrders2(this.userid, this.deliveryy, this.paymentt).subscribe((response: any) => {
      this.Orders = response.data;
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.loader = false;
      console.log(response);
      this.router.navigate(['/orders', 1], {queryParams:{delivery_status:this.deliveryy,payment_status:this.paymentt}});

    });

  }
  orderdetail(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['orderdetail', id]);
  }

  paynow1(order_detail:any){
    console.log("razorpay1 retry response", order_detail);
    let edata1 = {
      combined_order_id: order_detail.combined_order_id,
      payment_type:"cart_payment"
    }
    console.log(edata1);
    
    this.request.retrypayment(edata1).subscribe((response: any) => {
      console.log("razorpay1 retry response", response);
      if (response.result == true) {
        this.toastr.success('',response.message);
        let edata1 = {
          payment_type: "cart_payment",
          combined_order_id: order_detail.combined_order_id,
          amount: order_detail.grand_totalrepay,
          user_id: this.userid,
        }
        console.log("edata1", edata1);
         this.billdesk(edata1)
      }
      else{
        this.toastr.info('',response.message);
        this. quickorder(order_detail.id)
      }
    });
  }
  
  billdesk(edata1: any) {
    console.log("billdest called",edata1);
    this.request.billdeskpay(edata1.combined_order_id, edata1.amount, edata1.user_id,"repayment").subscribe(
      (response: any) => {
        response.json()
        console.log("billdesktype", response.json());
        console.log("billresponse", response);
      },
    );
  }

  viewitem() {

    this.request.vieworderitems(this.prdid).subscribe((response: any) => {
      this.Items = response.data;

    }
    );
  }
  quickorder(id:any){
    // this.spinner.show();
    this.loadingg=true
    this.request.quickorder(id).subscribe((res:any)=>{
      console.log("quickorder res",res);
      
      if(res.result==true){
        this.toastr.success('Added to cart', '');
        this.sharedService.sendClickEvent();
        this.loadingg=false
        this.router.navigate(['checkout']);
      }
      else{
        this.toastr.info('', res.message);
      }
    });
  }
  
  proddetail(id:any){
    window.scroll(0,0);
    this.router.navigate(['productdetail', id]);
  }
  addreview(content: any, _id: any) {
    this.product_iddd = _id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });

  }
  submitreview(form: FormGroup){
    this.error1 = '';
    
    if (this.register.invalid) {
  
      if(!this.register.get('rating')?.valid){
        this.error1 = '*give star';
      }
      else if ( !this.register.get('comment')?.valid) {
        this.error1 = '*type some comment';
      }  
      return;
    }
    else{
        let edata2={
          product_id:this.product_iddd,
          user_id: this.userid,
          rating:form.value.rating,
          comment:form.value.comment,
        }
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log("addreview",res);
      
      if (res.result == true) { 
        this.toastr.success('Review  Submitted', '');    
        this.modalService.dismissAll();   
      }
      else  {
        this.toastr.info(res.message);
        this.modalService.dismissAll(); 
  
      }
    }, (error: any) => {
      console.log("error",error);  
    });
   }
  }


}