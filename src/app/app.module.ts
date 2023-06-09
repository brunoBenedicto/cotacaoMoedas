import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { FormBuscaComponent } from './component/form-busca/form-busca.component';
import { GraficoComponent } from './component/grafico/grafico.component';
@NgModule({
  declarations: [
    AppComponent,
    FormBuscaComponent,
    GraficoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
