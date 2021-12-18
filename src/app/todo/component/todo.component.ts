import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../../services/TodoService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {

  @Input() public todo = new Todo('');
  public fg: FormGroup;

  constructor(private service: TodoService, private fb: FormBuilder) {
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
      (data: any) => { this.service.loading = false; },
      (err) => { this.service.loading = false; }
    );
  }

  public update(id: string) {
    this.service.loading = true;
    const { title } = this.fg.controls;
    this.service.UpdateTodo(id, title.value)
    .subscribe(
      (data: any) => { this.service.loading = false;  },
      (err) => { console.log(err); this.service.loading = false; }
    );
  }

}
