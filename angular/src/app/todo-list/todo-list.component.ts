import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos: any[] = [];
  editingTodo: any = null;

  constructor(private todo_service: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  showLoader = false;
  loadTodos() {
    this.showLoader = true;
    this.todo_service.getTodos().subscribe((res) => {
      this.showLoader = false;
      this.todos = res;
    });
  }

  show = false;
  open() {
    this.show = true;
  }

  edit(todo: any) {
    this.show = true
    this.editingTodo = { ...todo };
  }

  delete(id: number) {
    this.todo_service.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  onSaved() {
    this.editingTodo = null;
    this.loadTodos();
  }

}
