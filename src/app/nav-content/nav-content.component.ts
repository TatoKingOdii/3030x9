import { Component } from '@angular/core';
import {MatSidenavContent} from "@angular/material/sidenav";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [
    MatSidenavContent,
    UnauthorizedComponent,
    RouterOutlet
  ],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent {

}
