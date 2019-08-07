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

    data(): Observable<Array<any>> {
        return this.http.get<Array<any>>('/dummy/store/guestprofiles/profile/list');
    }

    async getData() {
        try {
            let result = await this.http.get<Array<any>>('/dummy/store/guestprofiles/profile/list').toPromise();
            return result;
        } catch (error) {
            console.log(error.status);
        }
    }
}
