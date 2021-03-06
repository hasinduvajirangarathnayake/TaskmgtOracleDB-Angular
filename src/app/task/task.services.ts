import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Task } from './task.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError} from 'rxjs';

@Injectable({ providedIn: 'any' })


export class TaskServices {
    error = new Subject<string>();
    constructor(private http: HttpClient) {}

    today = new Date().toLocaleDateString();
    

createTask(taskname: string,completedate: string){
       
  const taskData:Task = {taskname: taskname,completedate: completedate,status: 'Not Complete',startdate: this.today}

  this.http
      .post<{ name: string }>(
        'http://localhost:8083/api/tasks/',
        taskData,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
    }

  fechtAll(){

      return this.http
      .get(
        'http://localhost:8083/api/tasks/')
      
}


update(updatelist:Task[]){

  for (var updatevalue of  updatelist) {
  const url = 'http://localhost:8083/api/tasks/'+updatevalue.id;
  
  this.http.put(url,
    {
      "taskname": updatevalue.taskname,
      "completedate": updatevalue.completedate,
      "status": updatevalue.status,
      "startdate": updatevalue.startdate
    }
    
    ).subscribe(resp => {
    return resp;
  }
     );
  }
 
}

deleteTask(taskname:[]){
 
  for (var val of  taskname) {
    const url = 'http://localhost:8083/api/tasks/'+val;
     this.http.delete(url).subscribe(resp => {
      return resp;
  }
     );
}
 
}
 
}