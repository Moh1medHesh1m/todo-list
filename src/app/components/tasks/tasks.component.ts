import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../services/mock-tasks';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TasksService } from '../../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskComponent } from '../add-task/add-task.component';
@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [TasksService],
  imports: [
    CommonModule,
    TaskItemComponent,
    HttpClientModule,
    AddTaskComponent,
  ],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private readonly taskService: TasksService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }
  updateTaskReminder(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }
  addTask(task: Task) {
    this.taskService
      .createTask(task)
      .subscribe((newTask) => this.tasks.push(newTask));
  }
}
