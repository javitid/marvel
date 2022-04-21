import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../elements/dialog/dialog.component';
import { Superhero } from '../../interfaces/superhero.interface';
import { DataService } from '../../services/data.service'; 
import { Observable } from 'rxjs';

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

  public updateList(newList$: Observable<Superhero[]>) {
    this.superheroes$ = newList$;
  }

  public openDialog(superheroSelected: Superhero) {
    this.dialog.open(DialogComponent, {data: superheroSelected });
  }
}
