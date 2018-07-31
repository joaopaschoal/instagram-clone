import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public exibirMsgErroLogin: boolean = false;

  @Output() public solicitouPainelCadastro: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
    // window.formulario = this.formulario;
  }

  public exibirPainelCadastro(): void {
    this.solicitouPainelCadastro.emit('cadastro');
  }

  public autenticar(): void {
    if (this.formulario.valid) {
      this.autenticacaoService.autenticar(
        this.formulario.value.email,
        this.formulario.value.senha
      ).then(() => {
        this.exibirMsgErroLogin = false;
      }).catch((e) => {
        this.exibirMsgErroLogin = true;
      });
    }
  }

  public testarFormularioValido(): boolean {
    return this.formulario.valid;
  }

  public onEmailFocus(): void {
    this._limparMsgErro();
  }

  public onPasswordFocus(): void {
    this._limparMsgErro();
  }

  private _limparMsgErro(): void {
    this.exibirMsgErroLogin = false;
  }

}
