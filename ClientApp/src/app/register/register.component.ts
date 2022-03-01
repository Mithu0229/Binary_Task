import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fb: FormGroup;
  isSuccessful = false;
  isLoggedIn = false;
  
  constructor(private accountService: AccountService, private builder: FormBuilder,
    private toastr: ToastrService,private route:Router) { 

      this.fb=this.builder.group({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      
      });
    }

  ngOnInit(): void {
   this.isSuccessful=true;
  }



  register(){
    this.accountService.register(this.fb.value).subscribe(data=>{
      console.log(data);
      if(data===true){
        this.isSuccessful = true;
        this.toastr.success("User Create Successfully");
        this.isLoggedIn = true;
        this.route.navigate(['/login']);
      }
      else{

        this.toastr.success("Not Created");
        this.route.navigate(['/register']);
        
      }
    });
      
  }

  

  reloadPage(): void {
    window.location.reload();
  }
}
