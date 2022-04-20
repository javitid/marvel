import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DataService } from '../../services/data.service'; 
import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public columnsToDisplay: string[];
  public superheroes: MatTableDataSource<Superhero>;

  constructor(
    private readonly dataService: DataService
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    // Keys from interface to show them as headers in the table
    this.columnsToDisplay = ['nameLabel', 'genderLabel', 'citizenshipLabel', 'skillsLabel', 'occupationLabel', 'memberOfLabel', 'creatorLabel'];

    // Get superheroes from the service
    this.dataService.getSuperheroes().subscribe( (data: Superhero[]) => {
      this.superheroes = new MatTableDataSource(data);
      this.superheroes.sort = this.sort;
    })
  }
}
