import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  public superheroesMatTable: MatTableDataSource<Superhero>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() columnsToDisplay: string[];
  @Input() superheroes: Observable<Superhero[]>;
  @Output() rowSelected = new EventEmitter<Superhero>();

  ngAfterViewInit(): void {
    this.superheroes.subscribe( (data: Superhero[]) => {
      this.superheroesMatTable = new MatTableDataSource(data);
      this.superheroesMatTable.sort = this.sort;
    })
  }

  public selectSuperhero(superhero: Superhero) {
    this.rowSelected.emit(superhero);
  }
}
