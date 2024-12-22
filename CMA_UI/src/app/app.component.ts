import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { MasterPageComponent } from './Contacts/master-page/master-page.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MasterPageComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CMA_UI';
}
