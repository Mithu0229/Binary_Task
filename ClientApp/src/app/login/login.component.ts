import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fb: FormGroup;
  
  isLoggedIn = false;
  
  constructor(private accountService: AccountService, private builder: FormBuilder,
    private toastr: ToastrService,private route:Router) { 

      this.fb=this.builder.group({
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
    }

  ngOnInit(): void {
   
  }

  login(){
    this.accountService.login(this.fb.value).subscribe(data=>{
      console.log(data);
      if(data===true){
        this.toastr.success("Login Successfully");
        this.isLoggedIn = true;
        this.route.navigate(['/dashboard']);
      }
      else{

        this.toastr.success("Login Faild");
        this.route.navigate(['/login']);
        
      }
    });
      
  }


  reloadPage(): void {
    window.location.reload();
  }

}
