import { Injectable } from '@angular/core';
import { Train } from './models/train.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LogService } from './log.service';
import { AllowedStops } from './models/allowed-stops.model';
import { Axe } from './models/axe.model';

@Injectable({
  providedIn: 'root',
})
export class AxeService {
  private axeUrl = 'api/axes';
  public source = new BehaviorSubject<Axe[]>([]);
  public readonly axeState$ = this.source.asObservable();
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private logService: LogService) {}

  getAxes(): Observable<Axe[]> {
    return this.http.get<Axe[]>(this.axeUrl).pipe(
      tap((axes) => {
        this.source.next(axes);
        this.logService.info('fetched axes')}),
      catchError(this.handleError<Axe[]>('getAllowedStops', []))
    );
  }

  // getTrain(id: number): Observable<Train> {
  //   const url = `${this.trainsUrl}/${id}`;
  //   return this.http.get<Train>(url).pipe(
  //     tap((_) => this.logService.info(`fetched train id=${id}`)),
  //     catchError(this.handleError<Train>(`getTrain id=${id}`))
  //   );
  // }

  // updateTrain(train: Train): Observable<any> {
  //   return this.http.put(this.trainsUrl, train, this.httpOptions).pipe(
  //     tap((_) => this.logService.info(`updated train id=${train.id}`)),
  //     catchError(this.handleError<any>(`updateTrain id=${train.id}`))
  //   );
  // }

  addAxe(axe: Axe): Observable<Axe> {
    return this.http
      .post<Axe>(this.axeUrl, axe, this.httpOptions)
      .pipe(
        tap((axe: Axe) =>
          this.logService.info(`added axe w/ id=${axe.id}`)
        ),
        catchError(this.handleError<Axe>(`addAxe id=${axe.id}`))
      );
  }

  // deleteTrain(id: number): Observable<Train> {
  //   const url = `${this.trainsUrl}/${id}`;
  //   return this.http.delete<Train>(url, this.httpOptions).pipe(
  //     tap((_) => this.logService.info(`deleted train id=${id}`)),
  //     catchError(this.handleError<Train>(`deleteTrain id=${id}`))
  //   );
  // }

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
}
