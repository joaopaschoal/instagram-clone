import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class AutenticacaoService {

  public cadastrarUsuario(usuario: Usuario): void {
    console.log('cheguei no serviço', usuario);
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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

  public autenticar(usuario, senha): void {
    firebase.auth().signInWithEmailAndPassword(usuario, senha)
        .then((response: any) => {
          console.log(response);
        })
        .catch((e: Error) => {
          console.error(e);
        });
  }

}
