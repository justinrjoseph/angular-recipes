import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  startedEditing: Subject<number> = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor() { }

  getIngredients() {
    return this._ingredients.slice();
  }

  getIngredient(idx: number) {
    return this._ingredients[idx];
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  updateIngredient(idx: number, updatedIngredient: Ingredient) {
    this._ingredients[idx] = updatedIngredient;
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  deleteIngredient(idx: number) {
    this._ingredients.splice(idx, 1);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
