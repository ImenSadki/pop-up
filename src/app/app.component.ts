import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <button (click)="openSignupModal()">S'inscrire</button>

    <div class="modal-overlay" *ngIf="isModalOpen">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Inscription</h2>
          <button class="close-btn" (click)="closeModal()">✕</button>
        </div>

        <form (ngSubmit)="onSubmit()" class="signup-form">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input 
              type="text" 
              [(ngModel)]="username" 
              name="username" 
              required 
              minlength="3"
              #usernameInput="ngModel"
            >
            <div *ngIf="usernameInput.invalid && usernameInput.touched" class="error-message">
              <small *ngIf="usernameInput.errors?.['required']">Nom d'utilisateur requis</small>
              <small *ngIf="usernameInput.errors?.['minlength']">Min. 3 caractères</small>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email" 
              required 
              email
              #emailInput="ngModel"
            >
            <div *ngIf="emailInput.invalid && emailInput.touched" class="error-message">
              <small *ngIf="emailInput.errors?.['required']">Email requis</small>
              <small *ngIf="emailInput.errors?.['email']">Format invalide</small>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required 
              minlength="8"
              #passwordInput="ngModel"
            >
            <div *ngIf="passwordInput.invalid && passwordInput.touched" class="error-message">
              <small *ngIf="passwordInput.errors?.['required']">Mot de passe requis</small>
              <small *ngIf="passwordInput.errors?.['minlength']">Min. 8 caractères</small>
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="submit"
              [disabled]="!usernameInput.valid || !emailInput.valid || !passwordInput.valid"
            >
              S'inscrire
            </button>
            <button 
              type="button" 
              (click)="closeModal()"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-container {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      width: 400px;
      max-width: 90%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
    }

    .error-message {
      color: red;
      font-size: 0.8rem;
    }

    .form-actions {
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px;
      border: none;
      cursor: pointer;
    }

    button[type="submit"] {
      background-color: green;
      color: white;
    }

    button[type="submit"]:disabled {
      background-color: gray;
    }
  `]
})
export class AppComponent {
  isModalOpen = false;
  username = '';
  email = '';
  password = '';

  openSignupModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.username && this.email && this.password) {
      console.log('Inscription:', { 
        username: this.username, 
        email: this.email 
      });
      this.closeModal();
    }
  }
}