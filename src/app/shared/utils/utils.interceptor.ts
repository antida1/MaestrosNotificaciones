import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from './utils.const';

@Injectable()
export class UtilsInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = GlobalConstants.token();
        request  = request.clone({
            setHeaders: {
                "Authorization": ((token.toLowerCase().indexOf("bearer") == -1) ? `Bearer ${token}` : token),
                "Access-Control-Allow-Origin": "*"
            }
        });
        return next.handle(request);
    }
}

@Injectable()
export class UtilsErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.router.navigate(['hermex/unauthorized']);
            }

            const error = err.error || err.statusText;
            return throwError(error);
        }))
    }
}