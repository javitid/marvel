import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges {
  public superheroesMatTable: MatTableDataSource<Superhero>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() columnsToDisplay: string[];
  @Input() superheroes: Superhero[];
  @Output() rowSelected = new EventEmitter<Superhero>();

  ngAfterViewInit(): void {
    this.superheroesMatTable = new MatTableDataSource(this.superheroes);
    this.superheroesMatTable.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.superheroesMatTable = new MatTableDataSource(changes.superheroes.currentValue);
    this.superheroesMatTable.sort = this.sort;
  }

  public selectSuperhero(superhero: Superhero) {
    this.rowSelected.emit(superhero);
  }
}
