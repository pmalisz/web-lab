import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent {
  dish!: Dish;
  editMode: boolean = false;
  modelForm!: FormGroup;
  formErrors:Map<string, string>;
  validationMessages:Map<string, Map<string, string>>;
  subscriptions: Subscription;

  constructor(private formBuilder: FormBuilder,
              private dishService: DishService,
              public currencyService: CurrencyService,
              private route: ActivatedRoute) {
    this.formErrors = new Map([
      ['name', ''],
      ['ingredients', ''],
      ['maxPerDay', ''],
      ['price', ''],
      ['imgUrls', ''],
    ]);

    this.validationMessages = new Map([
      ['name', new Map([['required', 'Nazwa jest wymagana']])],
      ['ingredients', new Map([['required', 'Składniki są wymagane']])],
      ['maxPerDay', new Map([['required', 'Ilość na dzień jest wymagana'],
                            ['min', 'Minimalna ilość na dzień to 1']])],
      ['price', new Map([['required', 'Cena jest wymagana'],
                            ['min', 'Minimalna cena to 1$']])],
      ['imgUrls', new Map([['required', 'Link do zdjęć jest wymagany']])],
    ]);

    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    if(this.route.snapshot.params["id"]){
      this.subscriptions.add(this.dishService.dishesSubject.subscribe(() => {        
          this.dish = this.dishService.getDish(this.route.snapshot.params["id"]);
      }));
      
      this.editMode = true;
    }

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
    if (form.valid) {
      if(this.editMode){
        this.dishService.editDish(this.dish);
      }else{
        const newDish: Dish = {
          name: form.value.name,
          cuisineType: form.value.cuisineType,
          category: form.value.category,
          ingredients: form.value.ingredients,
          maxPerDay: form.value.maxPerDay,
          remaining: form.value.maxPerDay,
          price: form.value.price,
          description: form.value.description,
          imgUrls: form.value.imgUrls.replace(/\s/g, "").split(','),
          rate: 0
        }

        this.dishService.addDish(newDish);
        form.reset();
      }
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
