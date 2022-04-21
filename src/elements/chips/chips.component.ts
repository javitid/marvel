import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Superhero } from '../../interfaces/superhero.interface';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public formControl = new FormControl();
  public filteredSuperheroes$: Observable<Superhero[]>;
  public superheroesList: Superhero[] = [];
  public allSuperheroes: Superhero[];

  @ViewChild('inputRef', {static: true}) inputRef: ElementRef<HTMLInputElement>;

  @Input() superheroes$: Observable<Superhero[]>;
  @Output() updateList = new EventEmitter<Observable<Superhero[]>>();

  ngOnInit(): void {
    this.superheroes$.subscribe( (data: Superhero[]) => {
      this.allSuperheroes = data;

      this.filteredSuperheroes$ = this.formControl.valueChanges.pipe(
        startWith(null),
        map((superheroe: string | Superhero | null) =>
          superheroe ? this._filterByName(superheroe) : this.allSuperheroes.slice()
        )
      );
    })
  }

  public remove(superhero: Superhero): void {
    this.superheroesList = this.superheroesList.filter(((value: Superhero) => value !== superhero));
    this.updateList.emit(of(this.superheroesList));
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const selectedSuperheroe = this.allSuperheroes.find((superhero) => superhero.nameLabel === event.option.value.nameLabel);
    if (selectedSuperheroe) {
      this.superheroesList.push(selectedSuperheroe);
      this.updateList.emit(of(this.superheroesList));
    }

    // Clear input (both lines are needed because a known issue in the component)
    this.formControl.setValue('');
    this.inputRef.nativeElement.value = '';
  }

  private _filterByName(value: string|Superhero): Superhero[] {
    const nameToSearch = typeof(value) === 'string' ? value.toLowerCase() : value.nameLabel.toLowerCase();

    return this.allSuperheroes.filter((superhero) =>
      superhero.nameLabel.toLowerCase().includes(nameToSearch)
    );
  }
}
