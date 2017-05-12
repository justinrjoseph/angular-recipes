import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIdx: number;
  editedItem: Ingredient;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this._shoppingListService.startedEditing.subscribe(
      (idx: number) => {
        this.editedItemIdx = idx;
        this.editMode = true;
        this.editedItem = this._shoppingListService.getIngredient(idx);

        this.form.setValue({
          name: this.editedItem.name,
          quantity: this.editedItem.quantity
        });
      }
    );
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this._shoppingListService.deleteIngredient(this.editedItemIdx);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    if ( this.editMode ) {
      const updatedIngredient = new Ingredient(values.name, values.quantity);
      this._shoppingListService.updateIngredient(this.editedItemIdx, updatedIngredient);
    } else {
      const newIngredient = new Ingredient(values.name, values.quantity);
      this._shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
