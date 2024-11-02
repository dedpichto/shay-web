import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeManager } from './theme-manager.service';
import { City } from '../interfaces/city';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  cities: City[] = [];
  title = 'shay-web';
  themeManager = inject(ThemeManager);
  isDark$ = this.themeManager.isDark$;
  displayedColumns: string[] = ['ID', 'CountryCode', 'District', 'Population'];

  constructor(private cityService: HttpServiceService) { }
  ngOnInit(): void {
    var theme = this.themeManager.getStoredTheme();
    if (!theme)
      theme = "dark";
    document.documentElement.setAttribute('data-theme', theme);
    this.cityService.getCities().subscribe((data: City[]) => { this.cities = data; });
  }

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
    if (theme == 'auto') {
      theme = this.themeManager.getStoredTheme();
    }
    document.documentElement.setAttribute('data-theme', theme);
    // console.log('Theme is set to: ', theme);
    // console.log('data-theme attribute is set to: ', document.documentElement.getAttribute('data-theme'));
  }
}
