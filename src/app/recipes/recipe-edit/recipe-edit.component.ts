import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { ActivatedRoute, Router, Params } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _recipeService: RecipeService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] || false;
        this.initForm();
      }
    );
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onDeleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx);
  }

  onReturn() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  onSubmit() {
    if ( this.editMode ) {
      this._recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this._recipeService.addRecipe(this.recipeForm.value);
    }

    this.onReturn();
  }

  private initForm() {
    let recipe = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: new FormArray([])
    };

    if ( this.editMode ) {
      const selectedRecipe = this._recipeService.getRecipe(this.id);
      recipe.name = selectedRecipe.name;
      recipe.imagePath = selectedRecipe.imagePath;
      recipe.description = selectedRecipe.description;

      if ( selectedRecipe.ingredients ) {
        for ( let ingredient of selectedRecipe.ingredients ) {
          recipe.ingredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            quantity: new FormControl(ingredient.quantity, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      imagePath: new FormControl(recipe.imagePath, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      ingredients: recipe.ingredients
    });
  }
}
