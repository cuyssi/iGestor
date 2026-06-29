import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideLock, LucideUser } from '@lucide/angular';
import { Button } from '../../shared/button/Button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideUser, LucideLock, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/home']);
  }

}
