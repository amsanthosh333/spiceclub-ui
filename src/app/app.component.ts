import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spiceclub';
  showHead:boolean = true;
  showFooter:boolean = true;

    showheader(){
      this.showHead=true
      this.showFooter=true  
    }
    hideheader(){
      this.showHead=false
      this.showFooter=false  
    }
    
    constructor(private router: Router) {
      // on route change to '/login', set the variable showHead to false
        router.events.forEach((event) => {
          if (event instanceof NavigationStart) {
            this.showHead=true;
            this.showFooter=true ;
          }
        });
      }
}

