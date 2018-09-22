import { Component, DoCheck } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'lw-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements DoCheck {  
  
  public hurl
  constructor(private route:ActivatedRoute, private router:Router) {
    
  }
  ngDoCheck(){
   this.hurl= this.router.url
  }
  
}
