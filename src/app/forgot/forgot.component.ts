import { Component, OnInit, NgZone } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn,  AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export function phoneValidator(control: AbstractControl) {
  let phone= isNaN(control.value)
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let email= re.test(String(control.value).toLowerCase());   
  if (email==false && phone==true ) {  
    return { pevalid: true };
  }
  return null;
}
@Component({
  selector: 'lw-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  matcher1 = new MyErrorStateMatcher()
  public email=new FormControl('',[  
    Validators.required,
    phoneValidator, 
  ])
  public height:number=window.innerHeight;
  public errmsg:boolean=false

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
