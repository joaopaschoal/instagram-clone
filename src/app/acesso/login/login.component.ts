import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacaoService } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public solicitouPainelCadastro: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.solicitouPainelCadastro.emit('cadastro');
  }

  public autenticar(): void {
    console.log(this.formulario);
    this.autenticacaoService.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
  }

}
