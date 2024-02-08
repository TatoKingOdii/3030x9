import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {NavContainerComponent} from "./nav-container/nav-container.component";
import {NavContentComponent} from "./nav-content/nav-content.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavContainerComponent, NavContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '3030x9';
}
