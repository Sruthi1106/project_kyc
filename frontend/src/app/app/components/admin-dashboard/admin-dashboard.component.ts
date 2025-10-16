import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  users: any[] = [];
  error = '';
  q = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.api.listUsers().subscribe({
      next: (u) => (this.users = u),
      error: () => (this.error = 'Failed to load users'),
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }

  get total() { return this.users.length; }
  get pending() { return this.users.filter(u => u.status === 'Pending').length; }
  get approved() { return this.users.filter(u => u.status === 'Approved').length; }
  get rejected() { return this.users.filter(u => u.status === 'Rejected').length; }

  get filtered() {
    const q = this.q.toLowerCase();
    if (!q) return this.users;
    return this.users.filter(u =>
      (u.name||'').toLowerCase().includes(q) ||
      (u.email||'').toLowerCase().includes(q) ||
      (u.phone||'').toLowerCase().includes(q)
    );
  }
}
