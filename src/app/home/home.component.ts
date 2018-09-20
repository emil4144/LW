import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn,  AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
function comparepass(comparevalue:FormControl):ValidatorFn{
  return(c:AbstractControl):{[key:string]:boolean}|null=>{
    if(c.value!=comparevalue.value){
      return {"cpass":true}
    }
    return null
  }

}

@Component({
  selector: 'lw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public hide:boolean=true;
  matcher = new MyErrorStateMatcher()
  public email = new FormControl('', [
    Validators.required,
    Validators.email,
    
  ]);
  public password = new FormControl('', [
    Validators.required,  
    Validators.minLength(8)  
  ]);
  public fName = new FormControl('', [
    Validators.required,  
    
    
  ]);
  public lName = new FormControl('', [
    Validators.required,  
    
  ]);
  public rpassword = new FormControl('', [  
    Validators.required, 
    comparepass(this.password)  
  ]);
 
  constructor() { }

  ngOnInit() {
   console.log(this.lName.status)
  }



  join(){
    if(this.lName.status=="INVALID"||this.fName.status=="INVALID"||this.email.status=="INVALID"||this.password.status=="INVALID"||this.rpassword.status=="INVALID"){}
    else{
      console.log("joined")
    }
    
  }

  

}
