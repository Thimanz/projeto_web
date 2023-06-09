import { Component, DoCheck } from '@angular/core';
import { ProdutosServiceService } from '../services/produtos-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-busca',
  templateUrl: './produto-busca.component.html',
  styleUrls: ['./produto-busca.component.css'],
})
export class ProdutoBuscaComponent implements DoCheck {
  produtosObject: Object;
  descricaoProduto: String;
  descricaoUndefined: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ProdutosServiceService
  ) {}

  ngDoCheck() {
    if (
      String(this.route.snapshot.paramMap.get('descricao')) !==
      this.descricaoProduto
    ) {
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.descricaoProduto = String(
      this.route.snapshot.paramMap.get('descricao')
    );
    if (
      !this.route.snapshot.paramMap.get('descricao') ||
      this.route.snapshot.paramMap.get('descricao') === 'undefined'
    ) {
      this.descricaoUndefined = true;
    } else {
      this.descricaoUndefined = false;
    }
    this.listar();
  }

  listar() {
    this.service.getBuscaProduto(this.descricaoProduto).subscribe({
      next: (data: Object) => {
        this.produtosObject = data;
      },
    });
  }
  returnZero = () => 0;
}
