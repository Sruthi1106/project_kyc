import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  me: any;
  status = '';
  error = '';
  uploadError = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.me().subscribe({
      next: (u) => {
        this.me = u;
        this.status = u?.status;
      },
      error: () => (this.error = 'Failed to load profile'),
    });
  }

  upload(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    this.api.uploadDocuments(formData).subscribe({
      next: (u) => {
        this.me = u;
        this.uploadError = '';
      },
      error: () => (this.uploadError = 'Upload failed'),
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
