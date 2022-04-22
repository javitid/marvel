import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Headers } from '../../enums/headers.enum';
import { CreateComponent } from '../../elements/create/create.component';
import { DialogComponent } from '../../elements/dialog/dialog.component';
import { Superhero } from '../../interfaces/superhero.interface';
import { DataService } from '../../services/data.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  public columnsToDisplay: string[];
  public superheroes: Superhero[];
  public superheroesToShow: Superhero[];
  public changes: boolean;
  public superheroesSubscription: Subscription;

  constructor(
    public readonly dialog: MatDialog,
    private readonly dataService: DataService
  ) { }

  ngOnInit(): void {
    // Keys from interface to show them as headers in the table
    this.columnsToDisplay = Object.values(Headers);

    // Get superheroes from the service
    this.superheroesSubscription = this.dataService.getSuperheroes().subscribe( (heroesList: Superhero[]) => {
      this.superheroes = heroesList;
      this.superheroesToShow = this.superheroes;
    });
  }

  ngOnDestroy(): void {
    this.superheroesSubscription?.unsubscribe();
  }

  public updateList(newList: Superhero[]): void {
    this.changes = false;
    this.superheroesToShow = newList;
    this.forceTableReload();
  }

  public openInfoDialog(superheroSelected: Superhero): void {
    const dialogRef = this.dialog.open(DialogComponent, { data: superheroSelected });

    dialogRef.afterClosed().subscribe( (result: string) => {
      switch (result) {
        case 'delete':
          this.superheroes = this.superheroes.filter((hero: Superhero) => hero.nameLabel !== superheroSelected.nameLabel);
          this.superheroesToShow = this.superheroes;
          this.changes = true;
          break;
        case 'edit':
          this.edit(superheroSelected);
          break;
      }
    });
  }

  public create(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      height: '800px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe( (result: Superhero) => {
      if (result) {
        this.superheroes = [result, ...this.superheroes];
        this.superheroesToShow = this.superheroes;
        this.changes = true;
        this.forceTableReload();
      }
    });
  }

  public edit(superheroSelected: Superhero): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      data: superheroSelected,
      height: '800px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe( (result: Superhero) => {
      if (result) {
        const index = this.superheroes.findIndex((hero: Superhero) => hero.nameLabel === result.nameLabel);
        this.superheroes[index] = result;
        this.superheroesToShow[index] = this.superheroes[index];
        this.forceTableReload();
      }
    });
  }

  // Trick to force ngOnChanges into table component and reload the table content
  private forceTableReload(): void {
    this.superheroesToShow = [...this.superheroesToShow];
  }
}
