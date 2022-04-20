import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
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
