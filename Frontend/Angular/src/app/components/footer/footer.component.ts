import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerContent = [
    {
      label: "My Company",
      data: "Our company specializes in the creation of websites and NFT games."
    },
    {
      label: "About Us",
      data: "I am a solo developer working to bring Web3 projects to life."
    },
    {
      label: "Contact Us",
      data: "You can reach me by post mail at 1101 Washington Street, Pensacola, Florida."
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
