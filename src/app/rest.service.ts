import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestService {


  endpoint = 'http://localhost:8080/myapp/usuarios/';
  privatekey ='';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  public constructor(private http: HttpClient) { }

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
    console.log(this.privatekey);
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
      tap((user) =>console.log(`updated user id=${user.usuario}`)  ),
      catchError(this.handleError<any>('adduser'))

    );
  }

  setPrivateKey(){
    // this.httpOptions.headers.append('privateKey', this.privatekey);
  }

  updateUser (id, user): Observable<any> {
    this.setPrivateKey();
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
