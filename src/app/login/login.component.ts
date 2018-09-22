import { Component, OnInit, NgZone } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn,  AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function emailValidator(control: AbstractControl) {  
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let email= re.test(String(control.value).toLowerCase());    
  if (email==false ) {  
    return { email: true };
  }
  return null;
}

@Component({
  selector: 'lw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 public height:number=window.innerHeight;
 public password=new FormControl("",[
    Validators.required,
    Validators.minLength(8)
  ]);
  public hide:boolean=true;
  public matcher = new MyErrorStateMatcher();
  public email = new FormControl('', [
    Validators.required,
    emailValidator,
  ]);

  constructor(private ngZone:NgZone) { 
    window.onresize = (e) =>
    {       
        this.ngZone.run(() => {            
            this.height=window.innerHeight
        });
    };
  }

  ngOnInit() {
  }

}
