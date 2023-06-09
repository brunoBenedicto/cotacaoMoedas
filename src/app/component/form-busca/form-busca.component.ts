import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuscaService } from './form-busca.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html'
})

export class FormBuscaComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  moedas = [
    "Dólar australiano",
    "Dólar canadense",
    "Franco suíço",
    "Coroa dinamarquesa",
    "Euro",
    "Libra esterlina",
    "Iene japonês",
    "Coroa norueguesa",
    "Coroa sueca",
    "Dólar dos Estados Unidos"
  ];

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private formBuscaService: FormBuscaService
  ) {}


  ngOnInit() {
    this.formulario = this.formBuilder.group({
      moeda: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
    }, { validator: this.dataFinalPosteriorDataInicialValidator() });
  }


  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }

    const moeda: string = this.formulario.get('moeda')?.value;
    const dataInicio: string = this.formulario.get('dataInicio')?.value;
    const dataFim: string = this.formulario.get('dataFim')?.value;

    this.formBuscaService.setDados(moeda, dataInicio, dataFim);

    this.submitted = true;
  }

  dataFinalPosteriorDataInicialValidator(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const dataInicio = formGroup.get('dataInicio')?.value;
      const dataFim = formGroup.get('dataFim')?.value;

      if (dataInicio && dataFim && dataFim < dataInicio) {
        return { dataFinalAnterior: true };
      }

      return null;
    };
  }
}
