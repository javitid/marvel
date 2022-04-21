import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  public newHeroData = {} as Superhero;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Superhero,
    public dialogRef: MatDialogRef<CreateComponent>
  ) {
    if (data) { this.newHeroData = data }
  }

  public add(): void {
    this.dialogRef.close(this.newHeroData);
  }
}
