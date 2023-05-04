import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../environment/enviroment.prod';
import {IGetTasksResponse, ITask} from '../components/tasks/model/task.model';


@Injectable({
  providedIn: 'root',
})
export class TasksService {

  constructor(private http: HttpClient) {}

  getTasks(todoListId: string): Observable<ITask[]> {
    return this.http
      .get<IGetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoListId}/tasks`)
      .pipe(map(res => res.items))
  }
}
