import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  private readonly endpoint = "tasks";

  constructor(private http: HttpClient) {
  }

  public ping(): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + this.endpoint + "/ping");
  }
}
