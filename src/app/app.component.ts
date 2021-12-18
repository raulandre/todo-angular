import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from './todo/model/todo.model';
import { TodoService } from './services/TodoService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos$: Observable<Todo[]>;
  public fg: FormGroup;

  constructor(public service: TodoService, private fb: FormBuilder, private _snackbar: MatSnackBar) {
    this.todos$ = this.service.GetAll();
    this.fg = fb.group({
      title: ['', Validators.minLength(3)]
    });
  }

  get loading() {
    return this.service.loading;
  }

  submit() {
    const { title } = this.fg.controls;
    this.service.AddTodo(title.value)
    .subscribe(
      (data: any) => { 
        this.todos$ = this.service.GetAll(); 
        this.fg.reset(); 
        this._snackbar.open(data.message, 'Ok');
      },
      (err) => { this._snackbar.open(err.message, 'Ok') }
    );
  }
}
