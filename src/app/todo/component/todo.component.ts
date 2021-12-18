import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoService } from '../services/TodoService';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {

  @Input() public todo = new Todo('');

  constructor(private service: TodoService) { }

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

}
