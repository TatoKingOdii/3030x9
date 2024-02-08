import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Item} from "../../libs/model/item";
import {Category} from "../../libs/model/category";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {futureDateValidator} from "../../libs/validators/future-date-validator.directive";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {ContentService} from "../../libs/services/content-service/content.service";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardTitle,
    NgIf,
    FormsModule,
    MatFormField,
    MatCardContent,
    MatInput,
    MatCardActions,
    MatButton,
    MatCheckbox,
    MatLabel,
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatSuffix,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnChanges, OnInit {

  title = 'Select an item or add a new one!';
  @Input() selectedContent?: Item;
  @Input() contentList?: Item[] = [];
  @Output() onContentSave = new EventEmitter<Item>;
  @Output() onCancel = new EventEmitter;
  localContent: Item;
  categories: (string | Category)[] = Object.values(Category);
  reactiveForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'quantity': new FormControl(0,
      [Validators.required, Validators.min(0)]),
    'category': new FormControl(null, Validators.required),
    'receiveDate': new FormControl(null, Validators.required),
    'hasExpiration': new FormControl(false),
    'expirationDate': new FormControl(null)
  },
    {validators: futureDateValidator});

  constructor(private contentService: ContentService) {
    this.localContent = contentService.getDefaultContent();
  }
  ngOnInit() {
    this.reactiveForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(content => {
      console.log('Value Change event: ' + JSON.stringify(content));
      console.log("Form State: " + JSON.stringify(this.reactiveForm.value));
      console.log("Content State Old: " + JSON.stringify(this.localContent));

      if (content) {
        this.localContent.name = content.name ? content.name : '';
        this.localContent.quantity = content.quantity ? content.quantity : 0;
        this.localContent.category = content.category ? content.category : null;
        this.localContent.receiveDate = content.receiveDate ? content.receiveDate : null;
        this.localContent.hasExpiration = content.hasExpiration ? content.hasExpiration : false;
        this.localContent.expirationDate = content.expirationDate ? content.expirationDate : null;
      }

      console.log("Content State New: " + JSON.stringify(this.localContent));
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    let newContent = changes['selectedContent'] && changes['selectedContent'].currentValue;

    console.log('Change received: ' + JSON.stringify(newContent));
    if (newContent) {
      this.localContent = {...newContent};
      this.reactiveForm.reset(newContent);
    }
  }
}
