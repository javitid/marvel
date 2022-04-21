import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
  public superheroesMatTable: MatTableDataSource<Superhero>;
  private superheroesSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @Input() columnsToDisplay: string[];
  @Input() superheroes$: Observable<Superhero[]>;
  @Output() rowSelected = new EventEmitter<Superhero>();

  ngAfterViewInit(): void {
    this.superheroes$.subscribe( (data: Superhero[]) => {
      this.superheroesMatTable = new MatTableDataSource(data);
      this.superheroesMatTable.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.superheroesSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.superheroesSubscription?.unsubscribe();
    this.superheroesSubscription = changes.superheroes$.currentValue.subscribe( (data: Superhero[]) => {
      this.superheroesMatTable = new MatTableDataSource(data);
      this.superheroesMatTable.sort = this.sort;
    })
  }

  public selectSuperhero(superhero: Superhero) {
    this.rowSelected.emit(superhero);
  }
}
