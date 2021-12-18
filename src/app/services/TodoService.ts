import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../todo/model/todo.model";

@Injectable()
export class TodoService
{
    private url = 'https://localhost:7197/v1/todos';
    public loading = false;

    constructor(private http: HttpClient) { }

    public GetAll() {
        return this.http.get<Todo[]>(`${this.url}/todos`);
    }

    public AddTodo(title: string) {
        return this.http.post(this.url, { title, user: "username" });
    }

    public DeleteTodo(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }

    public UpdateTodo(id: string, title: string) {
        return this.http.put(this.url, { title, id, user: "username" });
    }

    public UpdateDone(id: string) {
        return this.http.put<any>(`${this.url}/update`, { id, username: 'username' });
    }
}