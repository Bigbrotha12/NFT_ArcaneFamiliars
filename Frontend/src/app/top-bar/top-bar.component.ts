import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
