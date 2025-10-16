import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-kyc-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kyc-details.component.html',
  styleUrl: './kyc-details.component.scss'
})
export class KycDetailsComponent {
  user: any;
  status = 'Pending';
  reason = '';
  error = '';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getUser(id).subscribe({
      next: (u) => {
        this.user = u;
        this.status = u.status;
      },
      error: () => (this.error = 'Failed to load user'),
    });
  }

  update() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.updateStatus(id, this.status, this.reason).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => (this.error = 'Failed to update status'),
    });
  }
}
