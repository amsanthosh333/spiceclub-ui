import { Component, OnInit } from '@angular/core';
import { Windows } from 'ng-bootstrap-icons/icons';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  description: any;
  desload: boolean=true;

  constructor(private request:RequestService) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getaboutus();
  }

  getaboutus(){
    this.request.getaboutus().subscribe((res:any)=>{
  this.description=res.data[0].content
  this.desload=false
     });
  }
}
