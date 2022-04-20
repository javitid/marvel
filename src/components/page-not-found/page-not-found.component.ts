import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  public error?: HttpErrorResponse;

  constructor(
    private dataService: DataService,
    public router: Router,
) { }

  ngOnInit(): void {
    this.error = this.dataService.getHttpError() as HttpErrorResponse;
  }

  public goToDashboard(): void {
    this.router.navigateByUrl('dashboard');
  }
}
