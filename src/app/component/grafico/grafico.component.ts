import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuscaService } from '../form-busca/form-busca.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})

export class GraficoComponent implements OnInit {
  dados: any[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('tableData') tableData!: ElementRef<HTMLTableElement>;
  chart!: Chart;
  constructor(private dadosService: FormBuscaService) {}

  ngOnInit(): void {
    this.dadosService.dados$.subscribe(dados => {
      this.dados = dados;
      console.log('Dados atualizados:', this.dados);
    });
  }

  ngAfterViewInit(): void {
    this.geraGrafico()
    this.gerarTabela()
  }

  geraGrafico(){
    const canvas = this.chartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Não foi possível obter o contexto do canvas.');
      return;
    }

    this.dadosService.dados$.subscribe(dados => {
      if (dados.length > 0) {
        if (this.chart) {
          this.chart.destroy(); // Destrói o gráfico existente
        }

        Chart.register(...registerables);
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dados.map(dado => dado.dataHoraCotacao),
            datasets: [
              {
                label: 'Cotação de Compra',
                data: dados.map(dado => dado.cotacaoCompra),
                borderColor: 'blue',
                fill: false
              },
              {
                label: 'Cotação de Venda',
                data: dados.map(dado => dado.cotacaoVenda),
                borderColor: 'red',
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true, // Permite definir a altura máxima
            aspectRatio: 3, // Proporção de largura para altura (altere conforme necessário)
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Data e Hora da Cotação'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Cotação'
                }
              }
            }
          }
        });
      }
    });
  }

  gerarTabela(): void {
    const tabela = this.tableData.nativeElement;
    tabela.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Cabeçalhos da tabela
    const headerRow = document.createElement('tr');
    ['Data e Hora', 'Cotação de Compra', 'Cotação de Venda'].forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Linhas da tabela
    this.dados.forEach(dado => {
      const row = document.createElement('tr');
      ['dataHoraCotacao', 'cotacaoCompra', 'cotacaoVenda'].forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = dado[key];
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });

    tabela.appendChild(thead);
    tabela.appendChild(tbody);
  }

}






