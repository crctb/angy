import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    constructor(
        private http: HttpClient
    ) { }

    // getData(): Observable<CSS> {
    //     return this.http.get<CSS>('assets/styles.css');
    // }
}
