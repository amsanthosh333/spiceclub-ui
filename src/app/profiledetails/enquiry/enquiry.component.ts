import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css'],
  providers: [ToastrService],
})
export class EnquiryComponent implements OnInit {
  registerForm: FormGroup;
  cardImageBase64: any;
  isImageSaved!: boolean;
  filename: any;
  gstImageBase64: any;
  panImageBase64: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  register!: FormGroup;
  username: any;
  error2: any;
  filename1: any;
  filename2: any;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private formBuilder: FormBuilder, private request: RequestService, private toastr: ToastrService) {

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.username = this.currentdetail.user?.name;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.registerForm = this.formBuilder.group({
      product: ['', [Validators.required]],
      product_description: ['', Validators.required],
      image: [''],
      // imagename: [''], 
      image2: [''],
      // imagename2: [''], 
      // image3: [''],
      // imagename3: [''], 
    },
    );
  }

  ngOnInit(): void {
  }
  onSubmit(form: FormGroup) {
    this.error2 = '';
    if (this.registerForm.invalid) {
      if (!this.registerForm.get('product')?.valid) {
        this.error2 = '* Enter product name';
      }
      else if (!this.registerForm.get('gstimg')?.valid) {
        this.error2 = '* *Enter some words in description';
      }
      return;
    } else {
      const edata = {
        user_id: this.userid,
        product: form.value.product,
        product_description: form.value.product_description,
        image: this.gstImageBase64,
        imagename: this.filename1,
        image2: this.panImageBase64,
        imagename2: this.filename2,
        image3: "",
        imagename3: ""
      }
      console.log("form valuessss", edata);
      this.request.sendenquiry(edata).subscribe((res: any) => {
        console.log("sendenquirysendenquirysendenquiry");
        console.log("sendenquiry response", res);
        if (res.result == true) {
          form.reset()
          this.toastr.success('Submited Successfully', '');
          this.modalService.dismissAll();
        }
        else {
          this.toastr.info('Something went wrong', '');
        }
      }, (error: any) => {
        console.log("error", error);
        this.toastr.info('Something went wrong', '');
      });
    }

  }
  fileChangeEvent(fileInput: any) {
    this.filename1 = fileInput.target.files[0].name;
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
          console.log("imgBase64Path", imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  fileChangeEvent2(fileInput: any) {
    this.filename2 = fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      // if (fileInput.target.files[0].size > max_size) {
      //     this.imageError =
      //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

      //     return false;
      // }

      // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result.split(',')[1];
          this.panImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          // this.previewImagePath = imgBase64Path;
          console.log("imgBase64Path pan", imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}