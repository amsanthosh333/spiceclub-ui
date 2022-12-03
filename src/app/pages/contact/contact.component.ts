import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  description: any;
  desload: boolean=true;

  constructor(private request:RequestService) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getaboutus();
  }

  getaboutus(){
    this.request.getcontact().subscribe((res:any)=>{
      console.log("contact res",res);
      
  this.description=res.data[0].content
  this.desload=false
     });
  }

}
