import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  endpoint = 'http://localhost:8080/myapp/usuarios/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAllUsuarios(): Observable<any> {
    console.log("Service GetAll");
    return this.http.get(this.endpoint).pipe(map(this.extractData));
  }
  getAllDocumentos(user): Observable<any> {
    console.log(user);
    console.log("Service GetAll");

    return this.http.get(this.endpoint+user+"/documentos").pipe(map(this.extractData));
  }
  getAllPermisos(user): Observable<any> {
    console.log(user);
    console.log("Service GetAll");

    return this.http.get(this.endpoint+user+"/permisos").pipe(map(this.extractData));
  }
  getUsuario(id): Observable<any> {
    return this.http.get(this.endpoint+id).pipe(map(this.extractData));
  }
  addUser (user): Observable<any> {
    console.log(user);
    return this.http.post<any>(this.endpoint, JSON.stringify(user), this.httpOptions).pipe(
      tap((user) => console.log(`added user w/ id=${user.usuario}`)),
      catchError(this.handleError<any>('adduser'))
    );
  }
  updateUser (id, user): Observable<any> {
    return this.http.put(this.endpoint + id+'/update',JSON.stringify(user), this.httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateuser'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
