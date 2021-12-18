import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Todo } from './todo/model/todo.model';
import { TodoService } from './todo/services/TodoService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos$: Observable<Todo[]>;
  public fg: FormGroup;

  constructor(public service: TodoService, private fb: FormBuilder) {
    this.todos$ = this.service.GetAll();
    this.fg = fb.group({
      title: ''
    });
  }

  submit() {
    const { title } = this.fg.controls;
    this.service.AddTodo(title.value)
    .subscribe(
      (data) => { this.todos$ = this.service.GetAll(); this.fg.reset(); },
      (err) => { console.log(err); }
    );
  }
}
