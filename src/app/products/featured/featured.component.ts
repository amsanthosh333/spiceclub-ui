import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']  
})
export class FeaturedComponent implements OnInit {
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

  constructor(private router: Router,private fb: FormBuilder,private request: RequestService) { }


  ngOnInit(): void {
    this.viewdata1();
  }
  viewdata1(){
    this.request.getfuturedcat().subscribe((response: any) => {
      // this.data = data;
      // this.filteredData = data;
      this.Futurecatg=response.data;
     
      console.log("response.data",response);
      console.log("allbrands",this.Futurecatg);
      // this.filteredData=data.response;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
}
