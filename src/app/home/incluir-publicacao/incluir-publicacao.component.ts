import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BdService } from '../../bd.service';
import { ProgressoService } from '../../progresso.service';

import { Observable, Subject, interval, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as firebase from 'firebase';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  private email: string;
  private imagem: any;

  public percentualUpload: number = 0;

  public getStatusUpload(): string {
    return this.progressoService.status;
  }

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
      }
    });

  }

  public incluirPublicacao(): void {
    let publicacao = {
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    };

    this.bdService.adicionarPublicacao(publicacao);

    let flgContinuar = new Subject();
    flgContinuar.next(true);

    interval(100) // <-- cria um interval Observer
      .pipe(takeUntil(flgContinuar))
      .subscribe(() => {

        if (this.progressoService !== undefined
            && this.progressoService.progresso !== undefined) {
          this.percentualUpload = Math.round((this.progressoService.progresso.bytesTransferred /
                                      this.progressoService.progresso.totalBytes) * 100);

          if (this.progressoService.status === 'concluido') {
            flgContinuar.next(false);
          }
        }

      }
    );
  }

  public onInputFileChange(evt: Event): void {
    let selectedFiles = (evt.target as HTMLInputElement).files;
    if (selectedFiles.length > 0) {
      this.imagem = selectedFiles[0];
    }
  }

}
