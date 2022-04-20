import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service'; 
import { Superhero } from '../../interfaces/superhero.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public columnsToDisplay: string[];
  public superheroes: Observable<Superhero[]>;

  constructor(
    private readonly dataService: DataService
  ) { }

  ngOnInit(): void {
    // Keys from interface to show them as headers in the table
    this.columnsToDisplay = ['nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel', 'occupationLabel', 'memberOfLabel', 'creatorLabel'];

    // Get superheroes from the service
    this.superheroes = this.dataService.getSuperheroes();
  }

  public updateList(newList: Observable<Superhero[]>) {
    this.superheroes = newList;
  }
}
