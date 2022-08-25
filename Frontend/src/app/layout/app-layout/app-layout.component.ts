import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  sideBarContent = [
    {
      section: "Familiars",
      content: [
        {
          label: "My Collection",
          link: "url"
        },
        {
          label: "Marketplace",
          link: "url"
        },
        {
          label: "Mint",
          link: "url"
        }
      ]
    },
    {
      section: "Transactions",
      content: [
        {
          label: "L1 Bridge",
          link: "url"
        },
        {
          label: "Change Traits",
          link: "url"
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
