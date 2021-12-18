import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../../services/TodoService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {

  @Input() public todo = new Todo('');
  public fg: FormGroup;

  constructor(private service: TodoService, private fb: FormBuilder, private _snackbar: MatSnackBar) {
    this.fg = fb.group({
      title: ['', Validators.minLength(3)]
    });
  }

  ngOnInit(): void {
  }

  public updateDone(id: string) {
    this.service.loading = true;
    this.service.UpdateDone(id)
    .subscribe(
      (data: any) => {
        this.service.loading = false;
        this._snackbar.open(data.message, 'Ok');
      },
      (err) => {
        this._snackbar.open(err.message, 'Ok'); 
        this.service.loading = false;
      }
    );
  }

  public update(id: string) {
    this.service.loading = true;
    const { title } = this.fg.controls;
    this.service.UpdateTodo(id, title.value)
    .subscribe(
      (data: any) => {
        this.service.loading = false; 
        this._snackbar.open(data.message, 'Ok');
      },
      (err) => {
        this._snackbar.open(err.message, 'Ok');
        this.service.loading = false;
      }
    );
  }

  public delete(id: string) {
    this.service.loading = true;
    this.service.DeleteTodo(id)
    .subscribe(
      (data: any) => {
        this.service.loading = false;
        this._snackbar.open(data.message, 'Ok');
      },
      (err) => {
        this._snackbar.open(err.message, 'Ok');
        this.service.loading = false;
      }
    );
  }
}