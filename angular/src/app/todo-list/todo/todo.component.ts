import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() editData: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() closeEmitter = new EventEmitter();

  constructor(private fb: FormBuilder, private todo_service: TodoService) {}
  
  todoForm!: FormGroup;
  
  ngOnInit(): void {    
    this.todoForm = this.fb.group({
      task_name: ['', Validators.required],
      status: ['pending'],  
    });
    
    if (this.editData) {
      this.todoForm.patchValue(this.editData);
    }
  }

  submit() {
    if (this.todoForm.invalid) return;

    if (this.editData) {
      this.todo_service
        .updateTodo(this.editData.id, this.todoForm.value)
        .subscribe(() => {
          this.cancel()
          this.todoForm.reset({ status: 'pending' });
          this.editData = null;
        }, (err) => alert('failed!'));
    } else {
      this.todo_service.addTodo(this.todoForm.value).subscribe(() => {
        this.cancel()
        this.todoForm.reset({ status: 'pending' });
      }, (err) => alert('failed!'));
    }
  }

  cancel() {
    this.saved.emit();
    this.closeEmitter.emit(false);
  }
}
