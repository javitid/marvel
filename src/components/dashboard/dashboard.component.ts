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
  public panelOpenState = false;

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

  // Callback when the list is filtered by the search input. It should only update the view and don't change the list of heroes
  public updateList(newList: Superhero[]): void {
    this.changes = false;
    this.superheroesToShow = newList;
    this.forceTableReload();
  }

  // Callback to show a dialog when user click on the row of an heroe
  public openInfoDialog(superheroSelected: Superhero): void {
    const dialogRef = this.dialog.open(DialogComponent, { data: superheroSelected });

    dialogRef.afterClosed().subscribe( (result: string) => {
      switch (result) {
        // Delete a hero
        case 'delete':
          this.superheroes = this.superheroes.filter((hero: Superhero) => hero.nameLabel !== superheroSelected.nameLabel);
          this.superheroesToShow = this.superheroes;
          this.changes = true;
          this.dataService.saveSuperheroes(this.superheroes);
          break;
        // Edit a hero
        case 'edit':
          this.edit(superheroSelected);
          break;
      }
    });
  }

  // Restore super heroes from the assets file
  public restoreSuperheroes(): void {
    this.dataService.restoreSuperheroes();
    this.ngOnInit();
  }

  // Create a new hero
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
        this.dataService.saveSuperheroes(this.superheroes);
        this.forceTableReload();
      }
    });
  }

  // Edit a hero
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
        this.dataService.saveSuperheroes(this.superheroes);
        this.forceTableReload();
      }
    });
  }

  // Trick to force ngOnChanges into table component and reload the table content
  private forceTableReload(): void {
    this.superheroesToShow = [...this.superheroesToShow];
  }
}
