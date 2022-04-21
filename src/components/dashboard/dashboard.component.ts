import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateComponent } from '../../elements/create/create.component';
import { DialogComponent } from '../../elements/dialog/dialog.component';
import { Superhero } from '../../interfaces/superhero.interface';
import { DataService } from '../../services/data.service'; 
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public columnsToDisplay: string[];
  public superheroes$: Observable<Superhero[]>;

  constructor(
    public readonly dialog: MatDialog,
    private readonly dataService: DataService
  ) { }

  ngOnInit(): void {
    // Keys from interface to show them as headers in the table
    this.columnsToDisplay = ['nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel', 'occupationLabel', 'memberOfLabel', 'creatorLabel'];

    // Get superheroes from the service
    this.superheroes$ = this.dataService.getSuperheroes();
  }

  public updateList(newList$: Observable<Superhero[]>): void {
    this.superheroes$ = newList$;
  }

  public openDialog(superheroSelected: Superhero): void {
    const dialogRef = this.dialog.open(DialogComponent, {data: superheroSelected });

    dialogRef.afterClosed().subscribe( (result: string) => {
      switch (result) {
        case 'delete':
          this.superheroes$.subscribe((heroes: Superhero[]) => {
            this.superheroes$ = of(heroes.filter((hero: Superhero) => hero.nameLabel !== superheroSelected.nameLabel));
          });
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
        this.superheroes$.subscribe((heroes: Superhero[]) => {
          this.superheroes$ = of([result, ...heroes]);
        });
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
        this.superheroes$.subscribe((heroes: Superhero[]) => {
          const index = heroes.findIndex((hero: Superhero) => hero.nameLabel === result.nameLabel);
          heroes[index] = result;
          this.superheroes$ = of(heroes);
        });
      }
    });
  }
}
