import { Injectable } from '@angular/core';
import { Train } from './models/train.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LogService } from './log.service';

interface TrainState {
  isLoading: boolean;
  trains: string[];
}

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private trainsUrl = 'api/trains';
  public initialised = false;

  public source = new BehaviorSubject<Train[]>([]);
  public readonly trainState$ = this.source.asObservable();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private logService: LogService) {}

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.trainsUrl).pipe(
      tap((trains) => {
        this.source.next(trains);
        this.logService.info('fetched trains');
        this.initialised = true
      }),
      catchError(this.handleError<Train[]>('getTrains', []))
    );
  }

  getTrain(id: number): Observable<Train> {
    const url = `${this.trainsUrl}/${id}`;
    return this.http.get<Train>(url).pipe(
      tap((_) => this.logService.info(`fetched train id=${id}`)),
      catchError(this.handleError<Train>(`getTrain id=${id}`))
    );
  }

  updateTrain(train: Train): Observable<any> {
    return this.http.put(this.trainsUrl, train, this.httpOptions).pipe(
      tap((_) => {
        this.logService.info(`updated train id=${train.id}`);
        console.log('what is in the update ?', train);
      }),
      catchError(this.handleError<any>(`updateTrain id=${train.id}`))
    );
  }

  addTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(this.trainsUrl, train, this.httpOptions).pipe(
      tap((train: Train) => {
        // this.source.next(this.source.value.concat(train));
        this.logService.info(`added train w/ id=${train.id}`);
      }),
      catchError(this.handleError<Train>(`addTrain id=${train.id}`))
    );
  }

  deleteTrain(id: number): Observable<Train> {
    const url = `${this.trainsUrl}/${id}`;
    return this.http.delete<Train>(url, this.httpOptions).pipe(
      tap((_) => this.logService.info(`deleted train id=${id}`)),
      catchError(this.handleError<Train>(`deleteTrain id=${id}`))
    );
  }

  //Search or filter results ?

  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //        this.log(`found heroes matching "${term}"`) :
  //        this.log(`no heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
  // }

  //make it shared ?
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  loadTrains() {
    this.getTrains().subscribe((trains) => this.source.next(trains));
  }
}
