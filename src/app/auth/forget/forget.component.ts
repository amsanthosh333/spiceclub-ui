import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { RequestService } from 'src/app/services/request.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';
import{ SharedService} from 'src/app/services/shared.service'
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
  providers: [ToastrService],

})
export class ForgetComponent implements OnInit {
  meetings = [

    { id: 'phone', value: 'phone' },
    { id: 'email', value: 'email' },

  ];
  forgotForm!: FormGroup;
  passwordForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
