import { Component } from '@angular/core';
import { FirestoreService } from './services/firestore.service';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProductListComponent } from "./components/product-list/product-list.component";

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, ProductListComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private firestoreService: FirestoreService) {}

  guardarUsuarioEjemplo() {
    this.firestoreService.guardarUsuario('Sofia', 'sofia@email.com', 28);
  }
}
