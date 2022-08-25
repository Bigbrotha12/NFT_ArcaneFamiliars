import { Component, OnInit } from '@angular/core';
import { IMXqueryService } from 'src/app/services/imxquery.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  topBarMenu = [
    {
      label: "Home",
      link: ""
    },
    {
      label: "Docs",
      link: ""
    },
    {
      label: "Whitepaper",
      link: ""
    },
    {
      label: "Play Now!",
      link: ""
    }
  ]

  logIn() {
    this.imx.setupAccount();
  }
  
  constructor(private imx: IMXqueryService) { }

  ngOnInit(): void {
  }

}
