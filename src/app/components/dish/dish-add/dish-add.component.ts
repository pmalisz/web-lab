import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-add',
  templateUrl: './dish-add.component.html',
  styleUrls: ['./dish-add.component.css']
})
export class DishAddComponent {
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;

  constructor(private formBuilder: FormBuilder, private dishService: DishService, public currencyService: CurrencyService) {
    this.formErrors = new Map([
      ['name', ''],
      ['ingredients', ''],
      ['maxPerDay', ''],
      ['price', ''],
      ['imgUrls', ''],
    ])


    this.validationMessages = new Map([
      ['name', new Map([['required', 'Nazwa jest wymagana']])],
      ['ingredients', new Map([['required', 'Składniki są wymagane']])],
      ['maxPerDay', new Map([['required', 'Ilość na dzień jest wymagana'],
                            ['min', 'Minimalna ilość na dzień to 1']])],
      ['price', new Map([['required', 'Cena jest wymagana'],
                            ['min', 'Minimalna cena to 1$']])],
      ['imgUrls', new Map([['required', 'Link do zdjęć jest wymagany']])],
    ]);
  }

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', Validators.required],
      cuisineType: '',
      category:'',
      ingredients: ['', Validators.required],
      maxPerDay: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      description:'',
      imgUrls: ['', Validators.required]
    })

    this.modelForm.valueChanges.subscribe(
      () => {
        this.validate(true);
      }
    )
  }

  onSubmit(form: FormGroup) {
    const newDish: Dish = {
      name: form.value.name,
      cuisineType: form.value.cuisineType,
      category: form.value.category,
      ingredients: form.value.ingredients,
      maxPerDay: form.value.maxPerDay,
      remaining: form.value.maxPerDay,
      price: form.value.price,
      description: form.value.description,
      imgUrls: form.value.imgUrls.replace(/\s/g, "").split(',')
    }

    if (form.valid) {
      this.dishService.addDish(newDish);
      form.reset();
    } else {
      this.validate();
    }
  }

  validate(chechDirty: boolean = false) {
    const form = this.modelForm;
    
    for (let [key, value] of this.formErrors) {     
      this.formErrors.set(key, '');
      let control = form.get(key); 
      const modeControl = chechDirty ? control?.dirty : true;

      if (control && modeControl && !control.valid) {
        const validationMessages = this.validationMessages.get(key);
        for (const key1 in control.errors) {
          this.formErrors.set(key, validationMessages?.get(key1) + ' ')
        }
      }
    }
  }
}
