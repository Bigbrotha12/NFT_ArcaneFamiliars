import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

/**
 * @title Autosize sidenav
 */
@Component({
  selector: 'app-side-bar',
  templateUrl: 'side-bar.component.html',
  styleUrls: ['side-bar.component.css'],
})
export class SideBarComponent implements OnChanges {

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
  
  ngOnChanges(): void {
    
  }
}