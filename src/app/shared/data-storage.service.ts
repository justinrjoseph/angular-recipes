import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';

import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from '../recipes/recipe.model';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  private _baseUrl = 'https://schwarz-udemy-recipes.firebaseio.com/';

  constructor(
    private _authService: AuthService,
    private _http: Http,
    private _recipeService: RecipeService
  ) { }

  storeRecipes() : Observable<Response> {
    const token = this._authService.getToken();

    return this._http.put(`${this._baseUrl}/recipes.json?auth=${token}`, this._recipeService.getRecipes());
  }

  getRecipes() {
    const token = this._authService.getToken();

    this._http.get(`${this._baseUrl}/recipes.json?auth=${token}`)
              .map((response: Response) => {
                const recipes: Recipe[] = response.json();

                for ( let recipe of recipes ) {
                  if ( !recipe.ingredients ) {
                    recipe.ingredients = [];
                  }
                }

                return recipes;
              })
              .subscribe(
                (recipes: Recipe[]) => {                  
                  this._recipeService.setRecipes(recipes);
                }
              );
  }
}
