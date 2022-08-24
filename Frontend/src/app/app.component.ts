import { Component } from '@angular/core';
import { IMXqueryService } from './services/imxquery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Arcane Familiars';
  
  log(){
    this.imx.setupAccount();
  }
  constructor(private imx: IMXqueryService) {}
}
