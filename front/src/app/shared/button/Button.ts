import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './Button.html',
  styleUrl: './Button.scss',
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
