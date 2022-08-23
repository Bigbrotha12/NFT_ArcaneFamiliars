import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  sideBarContent = [
    {
      section: "FirstSection",
      content: [
        {
          label: "FirstItem",
          link: "url"
        },
        {
          label: "SecondItem",
          link: "url"
        },
        {
          label: "ThirdItem",
          link: "url"
        }
      ]
    },
    {
      section: "SecondSection",
      content: [
        {
          label: "FirstItem",
          link: "url"
        },
        {
          label: "SecondItem",
          link: "url"
        }
      ]
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
