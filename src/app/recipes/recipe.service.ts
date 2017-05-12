import { Injectable, Output } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

import { Subject } from 'rxjs/Subject';

import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private _recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel',
      'A super-tasty schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]
    ),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else do you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  constructor(private _shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next(this._recipes.slice());
  }

  getRecipes() {
    return this._recipes.slice();
  }

  getRecipe(id: number) {
    return this._recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next(this._recipes.slice());
  }

  updateRecipe(idx: number, updatedRecipe: Recipe) {
    this._recipes[idx - 1] = updatedRecipe;
    this.recipesChanged.next(this._recipes.slice());
  }

  deleteRecipe(id: number) {
    this._recipes = this._recipes.filter((recipe) => recipe.id !== id);
    this.recipesChanged.next(this._recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this._shoppingListService.addIngredients(ingredients);
  }
}
