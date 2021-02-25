import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  show: boolean = false;
  url: string = 'https://weather-forecast-aevo.herokuapp.com/current';
  query: string = "";
  response: any;
  loading = false;
  error = false;

  toggleShow() {
    this.show = !this.show;
  } 

  onSubmit(form) {    
    this.loading = true;
    this.error = false;

    this.query = form.value.location;
    this.response = undefined;
    
    this.show = false;
    this.http.get(`${this.url}?location=${this.query}`).toPromise().then(data => {
      this.response = data;
      if (this.response.success === false) {
        this.error = true;
      } else {    
        this.persistData(data);
        this.show = true;
      }
    }).catch(e => {
      this.error = true;
    }).finally(() => {
      this.loading = false;
    });
  }
  constructor(private http: HttpClient) { }

  persistData(data) {
    const historyUrl = `${environment.apiUrl}/history`;
    this.http.post(historyUrl, data).toPromise().then(() => {
      console.log("Histórico atualizado!");
    }).catch(e => {
      console.log("Erro ao persistir histórico...");
    });
  }

  ngOnInit(): void {
  }

}
