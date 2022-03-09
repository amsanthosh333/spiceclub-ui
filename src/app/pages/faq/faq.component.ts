import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  description: any;
  desload: boolean=true;

  constructor(private request:RequestService) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getaboutus();
  }

  getaboutus(){
    this.request.getfaq().subscribe((res:any)=>{
      console.log("res",res);
  this.description=res.data[0].content
  
  this.desload=false
     });
  }
}