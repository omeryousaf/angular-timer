import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {

  constructor(private http: HttpClient) { }

  getDeadline(): Observable<number> {
    return this.http.get<{ secondsLeft: number }>('/api/deadline').pipe(
      map(response => response.secondsLeft),
      catchError(error => {
        console.error('Error fetching deadline:', error);
        return throwError(() => error);
      })
    );
  }
}
