import { Component, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

import { DataStorageService } from '../../shared/data-storage.service';

import { Response } from '@angular/http';

import { Recipe } from '../../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private _dataStorage: DataStorageService
  ) {}

  onLogout() {
    this.authService.logout();
  }

  saveData() {
    this._dataStorage.storeRecipes()
                     .subscribe((response: Response) => console.log(response));
  }

  getData() {
    this._dataStorage.getRecipes();
  }
}