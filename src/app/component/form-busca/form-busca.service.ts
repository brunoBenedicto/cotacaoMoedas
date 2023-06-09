import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {
  private dadosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public dados$: Observable<any[]> = this.dadosSubject.asObservable();

  constructor(private http: HttpClient) {}

  selecionaMoeda(moeda: string): string | null {

    switch (moeda) {
      // Américas
      case "Dólar dos Estados Unidos":
        return "USD";
      case "Dólar canadense":
        return "CAD";
      case "Peso argentino":
        return "ARS";
      case "Peso chileno":
        return "CLP";
      case "Peso colombiano":
        return "COP";
      case "Peso mexicano":
        return "MXN";

      //oceania
      case "Dólar australiano":
        return "AUD";

      // Europa
      case "Euro":
        return "EUR";
      case "Libra esterlina":
        return "GBP";
      case "Franco suíço":
        return "CHF";
      case "Coroa sueca":
        return "SEK";
      case "Coroa norueguesa":
        return "NOK";
      case "Coroa dinamarquesa":
        return "DKK";

      // Ásia
      case "Iene japonês":
        return "JPY";
      case "Yuan chinês":
        return "CNY";
      case "Won sul-coreano":
        return "KRW";
      case "Dólar de Hong Kong":
        return "HKD";
      case "Rúpia indiana":
        return "INR";
      case "Rupia indonésia":
        return "IDR";

      // África
      case "Rand sul-africano":
        return "ZAR";
      case "Naira nigeriano":
        return "NGN";
      case "Dinar argelino":
        return "DZD";
      case "Libra egípcia":
        return "EGP";
      case "Xelim queniano":
        return "KES";
      case "Metical moçambicano":
        return "MZN";

      default:
        return null;
    }
  }

  formataData(data: string): string {
    var dataf =data.split('-').reverse()
    var dataAux:string
    dataAux = dataf[0]
    dataf[0] = dataf[1]
    dataf[1] = dataAux
    return dataf.join('-')
  }

  read(moeda: string, inicio: string, fim: string): Observable<any> {
    var moedaSelecionada = this.selecionaMoeda(moeda);
    var iniciof = this.formataData(inicio);
    var fimf = this.formataData(fim);
    const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='${moedaSelecionada}'&@dataInicial='${iniciof}'&@dataFinalCotacao='${fimf}'&$top=30&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`;

    return this.http.get<any>(url);
  }

  setDados(moeda: string, inicio: string, fim: string): void {
    this.read(moeda, inicio, fim).subscribe(
      cotacoes => {
        if (cotacoes && cotacoes.value) {
          this.dadosSubject.next(cotacoes.value);
          console.log('Cotações encontradas:', cotacoes.value);
        } else {
          console.log('Não foi possível buscar as cotações.');
        }
      },
      error => {
        console.log('Erro ao buscar as cotações:', error);
      }
    );
  }
}






