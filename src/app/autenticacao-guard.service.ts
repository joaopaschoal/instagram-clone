
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  public constructor(
    private autenticacaoService: AutenticacaoService
  ) {}

  public canActivate(): boolean {
    return this.autenticacaoService.testarAutenticado();
  }

}
