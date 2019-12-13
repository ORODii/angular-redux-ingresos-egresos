// Módulos de Angular
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Módulos de terceros
import { AngularFireAuthModule } from '@angular/fire/auth';

// Componentes de la aplicación
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AngularFireAuthModule
    ],
})
export class AuthModule {}