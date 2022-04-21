import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  public data = {} as Superhero;
  constructor(public dialogRef: MatDialogRef<CreateComponent>) { }

  public add(): void {
    this.dialogRef.close(this.data);
  }
}
