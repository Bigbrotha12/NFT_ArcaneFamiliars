import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { MainComponent } from '../../components/main/main.component';

@Component({
  selector: 'app-landing-p',
  templateUrl: './landing-p.component.html',
  styleUrls: ['./landing-p.component.css']
})
export class LandingPComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
