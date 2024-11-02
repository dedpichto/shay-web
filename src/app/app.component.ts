import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeManager } from './theme-manager.service';
import {City} from '../interfaces/city';
import {HttpServiceService} from '../services/http-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  cities:City[]=[];
  title = 'shay-web';
  themeManager = inject(ThemeManager);
  isDark$ = this.themeManager.isDark$;

  constructor(private cityService: HttpServiceService){

  }
  ngOnInit(): void {
    this.cityService.getCities().subscribe((data: City[]) => { this.cities = data;});
  }

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
