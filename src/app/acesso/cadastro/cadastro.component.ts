import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario.model';
import { AutenticacaoService } from '../../autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public solicitouLogin: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'nomeCompleto': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    'nomeUsuario': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    'email': new FormControl(null, [Validators.required, Validators.minLength(4)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(4)])
  });

  constructor(
    public autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit() {
    console.log(this.formulario);
  }

  exibirLogin(): void {
    this.solicitouLogin.emit('login');
  }

  cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.email,
      this.formulario.value.senha
    );
    this.autenticacaoService.cadastrarUsuario(usuario);
  }

}
