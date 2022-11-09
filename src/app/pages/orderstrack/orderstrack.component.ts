import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-orderstrack',
  templateUrl: './orderstrack.component.html',
  styleUrls: ['./orderstrack.component.css']
})
export class OrderstrackComponent implements OnInit {

  description: any;
  desload: boolean=false;
  constructor(private request:RequestService) { }
  ngOnInit(): void {
    window.scroll(0,0)
  } 
}

