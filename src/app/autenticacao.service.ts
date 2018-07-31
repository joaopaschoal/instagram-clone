import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AutenticacaoService {

  public tokenId: string;

  public constructor(
    private router: Router
  ) {}

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta) => {
          let base64Pwd = btoa(usuario.senha);
          delete usuario.senha;
          firebase.database()
              .ref(`usuario_detalhe/${base64Pwd}`)
              .set(usuario);

        })
        .catch((erro) => {
          console.error(erro);
        });
  }

  public autenticar(usuario, senha): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario, senha)
        .then((response: any) => {
          firebase.auth().currentUser.getIdToken()
              .then((tokenId) => {
                localStorage.setItem('tokenId', tokenId);
                this.tokenId = tokenId;
                this.router.navigate(['/home']);
                resolve();
              })
        })
        .catch((e: Error) => {
          console.error(e);
          reject(e);
        });
    });
  }

  public testarAutenticado(): boolean {
    if (!this.tokenId && localStorage.getItem('tokenId')) {
      this.tokenId = localStorage.getItem('tokenId');
    }

    if (!this.tokenId) {
      this.router.navigate(['/']);
    }

    return this.tokenId !== undefined;
  }

  public sair(): Promise<any> {
    return firebase.auth().signOut().then(
      () => {
        localStorage.removeItem('tokenId');
        this.tokenId = undefined;
        this.router.navigate(['/']);
      }
    );
  }

}
