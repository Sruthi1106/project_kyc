import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  model: any = { email: '', password: '' };
  loading = false;
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  submit() {
    this.loading = true;
    this.api.adminLogin(this.model).subscribe({
      next: ({ token }) => {
        localStorage.setItem('token', token);
        this.loading = false;
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Login failed';
      },
    });
  }
}
