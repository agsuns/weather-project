import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

    page = 0;
    limit = 5;
    history: any = [];
    error = false;
    loading = true;
    dbCount = Infinity;
    
    constructor(private httpClient: HttpClient) {
        this.getHistory();
    }

    nextPage() {
        if (((this.page + 1) * this.limit) <= this.dbCount) {
            this.page = this.page + 1;
            this.getHistory();
        }
    }

    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.getHistory();
        }
    }

    getHistory() {
        const historyUrl = `${environment.apiUrl}/history?page=${this.page}&limit=${this.limit}`;
        this.error = false;
        this.loading = true;
        this.httpClient.get(historyUrl).toPromise().then((response: any) => {
            this.history = response.data;
            this.dbCount = response.count;
        }).catch(e => {
            this.error = true;
        }).finally(() => {
            this.loading = false;
        });
    }
}
