import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { windows } from 'ngx-bootstrap-icons';
import { ConfirmedValidator } from 'src/app/auth/confirmedValidator';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [ToastrService],
})
export class AddressComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  register!: FormGroup;
  City: any=[];
  Country: any=[];
  State: any;
  Address: any;
  editForm!: FormGroup;
  rowiid: any;
  username: any;
  loader: boolean=true;
  error2: any;
  state_id: any;
  country_id: any;

  lat = 48.75606;
  lng = -118.859;

  selectedMarker :any= null;

  markers = [
    // These are all just random coordinates from https://www.random.org/geographic-coordinates/
    { lat: 22.33159, lng: 105.63233, alpha: 1 },
    { lat: 7.92658, lng: -12.05228, alpha: 1 },
    { lat: 48.75606, lng: -118.859, alpha: 1 },
   
  ];
  address: FormGroup;
  paymentModeStatus: any;
  indexx: any;
  address_id: any;
  radioSelected: any =21;
  addbtn_load: boolean =true;
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, 
    private request: RequestService,
    private modalService: NgbModal,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.username = this.currentdetail.user?.name;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
     this.address = this.fb.group({
      addresss: [''], 
   })
  }
  ngOnInit(): void {
    this.getaddress();
    this.viewcountry();
    this. viewstate();
    this.viewCity();
    this.register = this.fb.group({    
     address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      phone: [ '',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]],
    });

    this.editForm = this.fb.group({ 
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['',[Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      phone: [ '',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$") ]],
    });
  
  }
  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event: { latitude: any; longitude: any; }) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  getaddress(){
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address=response.data;   
      this.loader=false
      this.indexx =this.Address.findIndex((x:any) => x.set_default ==1);
      this.address_id=this.Address[this.indexx]?.id
      this.radioSelected = this.Address[this.indexx].id;  
      window.scroll(0,0)   
    // this. processdata()    
    });
  }
  addaddresss(content:any){
    this.register.reset();
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });  
  }

  viewcountry(){
    this.request.fetchcountry().subscribe((response: any) => {
      this.Country=response.data;        
    // this. processdata()    
    });
  }
  selectcountry(event: any) {
    this.country_id = event.target.value;
    this.request.fetchstatebycountry(this.country_id).subscribe((response: any) => {
      this.State = response.data;
    });

  }
  viewstate(){
    this.request.fetchstate().subscribe((response: any) => {
      this.State=response.data;        
    });
  }
  selectstate(event: any) {
    this.state_id = event.target.value;
    this.request.fetchcitybystate(this.state_id).subscribe((response: any) => {  
      this.City = response.data;

    });

  }
  viewCity(){
    this.request.fetchCity().subscribe((response: any) => {
      this.City=response.data;     
    });
  }
  onAddRowSave(form: FormGroup) {  
 
    this.error2 = '';
    if (this.register.invalid) {
      this.error2 = '* Enter all details';
      return;
    } else {
    const edata = { 
      user_id: this.userid,
      address:form.value.address,
      country_id:form.value.country,
      state_id:form.value.state,
      city_id:form.value.city,
      postal_code:form.value.postal_code,
      phone:form.value.phone,  
    }
  
    this.request.addaddress(edata).subscribe((res: any) => {
      if (res.result == true) {       
        form.reset()
        this.getaddress()
        this.toastr.success('Added Successfully','');
      this.modalService.dismissAll();  
      }
      else  {
        form.reset();
    this.modalService.dismissAll();
      }
    }, (error: any) => {
      console.log("error",error);
      form.reset();
      this.modalService.dismissAll();
    });
  }
  }
  editRow(row: any , content: any) {

    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
    this.rowiid=row.id;

    this.editForm.setValue({
      address: row.address,
      country: row.country_id,
      state: row.state_id,
      city: row.city_id,
      postal_code: row.postal_code,
      phone: row.phone,

    });
  

  }
  deleteRow(row:any) {
    this.request.deleteaddress(row.id).subscribe((response: any) => {
      if (response.result == true) {
        this.modalService.dismissAll();
        this.toastr.error('Removed Successfully','');
        this.getaddress(); 
      
      }
      else  {
        this.modalService.dismissAll();
      }   
     }, );
  }
changeshippingaddress(a_id:any){ 
  this.getaddress();
  const edata = { 
    user_id: this.userid,
    id:a_id,   
  }
  this.request.makeshipingaddress(edata).subscribe((res: any) => {
    if (res.result == true) {       
    }
    else  {
    }
  },);
}

  onEditSave(form: FormGroup) {

    if (this.register.invalid) {
      this.error2 = '* Enter all details';
      return;
    } else {
    const edata2 = {
       id:this.rowiid,
      user_id: this.userid,
      address:form.value.address,
      country_id:form.value.country,
      state_id:form.value.state,
      city_id:form.value.city,
      postal_code:form.value.postal_code,
      phone:form.value.phone,  
  }
  this.request.updateaddress(edata2).subscribe((res: any) => {
    if (res.message == 'Shipping information has been updated successfully') {
      this.modalService.dismissAll();
      this.toastr.success('Updated Successfully','');
      this.getaddress(); 
    
    }
    else  {
      this.modalService.dismissAll();
      this.toastr.error('Something went wrong','');
    }

  }, (error: any) => {
    console.log(error);
    this.modalService.dismissAll();
  });

  }
  }

}
