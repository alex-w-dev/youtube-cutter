import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getFullUrl(url) {
    return `http://localhost:3000/api/${url}`;
  }

  GET(url: string, options?): Observable<any> {
    return this.http.get(this.getFullUrl(url), options);
  }

  POST(url: string, data?: any | FormData): Observable<any> {
    return this.http.post(this.getFullUrl(url), data);
  }

  PUT(url: string, data: any | FormData): Observable<any> {
    return this.http.put(this.getFullUrl(url), data);
  }

  PATCH(url: string, data): Observable<any> {
    return this.http.patch(this.getFullUrl(url), data);
  }

  DELETE(url: string) {
    return this.http.delete(this.getFullUrl(url));
  }

  GET_BLOB(url: string, onProgress?: (v: any) => void): Observable<string> {
    return this.GET(url, { responseType: 'blob', observe: 'events', reportProgress: true })
      .pipe(filter((res) => {
        let contentLength = 0;
        if (res.type === HttpEventType.ResponseHeader) {
          contentLength = res.headers.get('content-length');
        }
        if (res.type === HttpEventType.DownloadProgress && onProgress) {
          onProgress(Object.assign(res, { contentLength }));
        }

        return res.type === HttpEventType.Response;
      }))
      .pipe(map((res) => {
        return {
          blob: new Blob([res.body], {type: res.headers.get('Content-Type')}),
          filename: res.headers.get('File-Name'),
        };
      }))
      .pipe(map((data) => {
        return window.URL.createObjectURL(data.blob);
      }));
  }

  DOWNLOAD_FILE(url: string) {
    return this.GET(url, { responseType: 'blob', observe: 'response' })
      .pipe(map((res) => {
        return {
          blob: new Blob([res.body], {type: res.headers.get('Content-Type')}),
          filename: res.headers.get('File-Name'),
        };
      }))
      .pipe(map((data) => {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';

        const fileUrl = window.URL.createObjectURL(data.blob);
        a.href = fileUrl;
        a.download = data.filename;
        a.click();

        window.URL.revokeObjectURL(fileUrl);
        document.body.removeChild(a);
      }));
  }
}
