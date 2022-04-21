import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
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
  public allSuperheroes: Superhero[] = [];

  @ViewChild('inputRef', {static: true}) inputRef: ElementRef<HTMLInputElement>;

  @Input() superheroes: Superhero[];
  @Output() updateList = new EventEmitter<Superhero[]>();

  ngOnInit(): void {
    this.allSuperheroes = [...this.superheroes];

    this.filteredSuperheroes$ = this.formControl.valueChanges.pipe(
      startWith(null),
      map((superheroe: string | Superhero | null) =>
        superheroe ? this._filterByName(superheroe) : this.allSuperheroes.slice()
      )
    );
  }

  public remove(superhero: Superhero): void {
    this.superheroesList = this.superheroesList.filter(((value: Superhero) => value !== superhero));

    // If all the filters have been cleared return the full list
    if (this.superheroesList.length === 0) {
      this.updateList.emit(this.allSuperheroes);
    } else {
      this.updateList.emit(this.superheroesList);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const selectedSuperheroe = this.allSuperheroes.find((superhero) => superhero.nameLabel === event.option.value.nameLabel);
    if (selectedSuperheroe) {
      this.superheroesList.push(selectedSuperheroe);
      this.updateList.emit(this.superheroesList);
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
