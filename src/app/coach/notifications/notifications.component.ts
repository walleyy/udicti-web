import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  heading: string;
  type: number;
  timeId: number;
  members: string[any];
}
const ELEMENT_DATA: PeriodicElement[] = [
  {type: 1, heading: 'Hydrogen', timeId: 1.0079, members: 'H,e,r'},
  {type: 2, heading: 'Helium', timeId: 4.0026, members: 'He'},
  {type: 3, heading: 'Lithium', timeId: 6.941, members: 'Li'},
  {type: 4, heading: 'Beryllium', timeId: 9.0122, members: 'Be'},
  {type: 5, heading: 'Boron', timeId: 10.811, members: 'B'},
  {type: 6, heading: 'Carbon', timeId: 12.0107, members: 'C'},
  {type: 7, heading: 'Nitrogen', timeId: 14.0067, members: 'N'},
  {type: 8, heading: 'Oxygen', timeId: 15.9994, members: 'O'},
  {type: 9, heading: 'Fluorine', timeId: 18.9984, members: 'F'},
  {type: 10, heading: 'Neon', timeId: 20.1797, members: 'Ne'},
];



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  // for mat-chip
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', {static: true}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: true}) matAutocomplete: MatAutocomplete;

// for table
  displayedColumns: string[] = ['type', 'heading', 'timeId', 'members'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  // for options
  options: string[] = ['public', 'private'];
  isDisabled = true;
  setNotification = new FormControl();



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() { this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit() {
  }

  change(s: string) {
    if (s !== 'private') {
      this.isDisabled = false;
    }
    console.log(s);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }
  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}
