import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

  constructor(
    private progressoService: ProgressoService
  ) { }

  public adicionarPublicacao(publicacao: any) {

    let emailBase64 = btoa(publicacao.email);
    firebase.database()
        .ref(`publicacoes/${emailBase64}`)
        .push(publicacao)
        .then((data: any) => {

          let chavePublicacao = data.key;
          firebase.storage().ref()
              .child(`imagens/${chavePublicacao}`)
              .put(publicacao.imagem)
              .on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                  this.progressoService.status = 'andamento'
                  this.progressoService.progresso = snapshot;
                },
                (error) => {
                  this.progressoService.status = 'erro'
                  console.log(error);
                },
                () => {
                  this.progressoService.status = 'concluido'
                }
              );

        });



  }

}
