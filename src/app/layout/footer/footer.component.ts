import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ToastrService],
})
export class FooterComponent implements OnInit {
  subscribe!: FormGroup;
  error: any;
  facebookurl: any;
  youtubeurl: any;
  instagramurl: any;
  twitterurl: any;
  Paymentmethod: any;
  linkedinurl: any;

  constructor(private fb: FormBuilder, private request: RequestService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.subscribe = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
    });
    this.getfacebookurl();
    this.getinstagramurl();
    this.gettwitterurl();
    this.getyoutubeurl();
    this.getpayment();
    this.getlinkedurl();

  }
  mailsubscribe(form: FormGroup) {
    this.error = '';
    if (this.subscribe.invalid) {
      this.error = '* Enter valid email';
      return;
    } else {
      let edata = {
        email: form.value.mail
      };
      this.request.emailsubscribe(edata).subscribe((res: any) => {
        console.log(res);
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

  getpayment() {
    this.request.fetchpayment().subscribe((res: any) => {
      this.Paymentmethod = res;
      console.log("this.Paymentmethod", this.Paymentmethod);
    });
  }

  getfacebookurl() {
    this.request.fetchfacebookurl().subscribe((res: any) => {
      this.facebookurl = res.link;
      console.log("this.facebookurl", this.facebookurl);
    });
  }
  getyoutubeurl() {
    this.request.fetchyoutubeurl().subscribe((res: any) => {
      this.youtubeurl = res.link;
      console.log("this.youtubeurl", this.youtubeurl);
    });
  }
  getinstagramurl() {
    this.request.fetchinstagramurl().subscribe((res: any) => {
      this.instagramurl = res.link;
      console.log("this.instagramurl", this.instagramurl);
    });
  }

  gettwitterurl() {
    this.request.fetchtwitterurl().subscribe((res: any) => {
      this.twitterurl = res.link;
      console.log("this.twitterurl", this.twitterurl);
    });
  }
  getlinkedurl() {
    this.request.fetchlinkedurl().subscribe((res: any) => {
      this.linkedinurl = res.link;
      console.log("this.instagramurl", this.instagramurl);
    });
  }
}

