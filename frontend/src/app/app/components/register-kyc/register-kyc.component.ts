import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-kyc',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-kyc.component.html',
  styleUrl: './register-kyc.component.scss'
})
export class RegisterKycComponent {
  model: any = { name: '', email: '', phone: '', address: '', aadhaar: '', pan: '', password: '' };
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    this.loading = true;
    this.error = '';
    this.api.register(this.model).subscribe({
      next: (res: any) => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
        }
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Registration failed';
      },
    });
  }
}
