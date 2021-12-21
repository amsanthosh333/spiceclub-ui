import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/services/request.service'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Slider: any;
  loadingIndicator: boolean | undefined;
  Futurecatg: any;
  opencat: any;
  FeaturePro: any;
  page1: boolean=true;
  page2: boolean=false;
  openproduct: any;
  Peoduct: any;
  page3: boolean=false;
  Banners: any;
  Todaysdeal: any;
  sliddder: any;
   imggg= "https://neophroncrm.com/spiceclubnew/public/uploads/all/UDLqy0hIg1qmw8OlafXKE4bt9LxODcXMOPvTiabw.png"
  Bestsellpro: any;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService,private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.viewdata();
    this.viewfuturedpro();
    // this.viewdata2();
    // this.viewdata3();
    // this.viewdata4();
  }
  viewdata(){
    this.request.getslider().subscribe((response: any) => { 
      this.Slider=response.data;
      console.log("slider.data",response.data);
      console.log("slider",this.Slider[0].photo);
this.sliddder=this.Slider[0].photo
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  viewfuturedpro(){
    this.request.getbestsellpro().subscribe((response: any) => {
      this.Bestsellpro=response.data.slice(0,8);
      console.log("best sellling",this.Bestsellpro);  
    });
  }
  openquick(content:any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

}
