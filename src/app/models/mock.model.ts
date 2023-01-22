import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Dish } from "./dish.model";

export class MockData {
    static dishes: Dish[] = [
        {name: 'Burger', cuisineType: 'amerykańska', category: 'danie główne', ingredients: 'bułka, ser, wołowina, sos', maxPerDay: 20, remaining: 20, price: 15, description: 'opis burgera', imgUrls: ["../../assets/dish_images/burger.jpg","../../assets/dish_images/burger2.jpg","../../assets/dish_images/burger3.jpg"], rate: 4},
        {name: 'Ciasto', cuisineType: 'nie wiem', category: 'deser', ingredients: 'czekolada, mleko', maxPerDay: 5, remaining: 5, price: 10, description: 'słodkie, czekoladowe ciasto', imgUrls: ["../../assets/dish_images/cake.jpg"], rate: 3},
        {name: 'Chilli con carne', cuisineType: 'meksykańska', category: 'danie główne', ingredients: 'wołowina, pomidory', maxPerDay: 12, remaining: 12, price: 22, description: 'brdzo dobre', imgUrls: ["../../assets/dish_images/chilli-con-carne.jpg"], rate: 1},
        {name: 'Kurczak z grilla', cuisineType: 'międzynarodowa', category: 'zdrowe', ingredients: 'kurczak, przyprawy', maxPerDay: 24, remaining: 24, price: 16, description: 'pyszny i soczysty', imgUrls: ["../../assets/dish_images/grilled-chicken.jpg"], rate: 5},
        {name: 'Kebab', cuisineType: 'turecka', category: 'fast-food', ingredients: 'mięso, pita', maxPerDay: 6, remaining: 6, price: 16, description: 'mięso mieszane + sos łagodny', imgUrls: ["../../assets/dish_images/kebab.jpg"], rate: 3},
        {name: 'Pad-thai', cuisineType: 'tajska', category: 'danie główne', ingredients: 'makaron, orzechy, tofu', maxPerDay: 11, remaining: 11, price: 21, description: 'opis pad thai', imgUrls: ["../../assets/dish_images/pad-thai.jpg"], rate: 4},
        {name: 'Makaron', cuisineType: 'włoska', category: 'danie główne', ingredients: 'makaron, sos, fasola', maxPerDay: 24, remaining: 24, price: 14, description: 'proste i smaczne', imgUrls: ["../../assets/dish_images/pasta.jpg"], rate: 2},
        {name: 'Pizza', cuisineType: 'włoska', category: 'danie główne', ingredients: 'salami, ser, sos', maxPerDay: 10, remaining: 10, price: 20, description: 'kto nie lubi pizzy', imgUrls: ["../../assets/dish_images/pizza.jpg"], rate: 2},
        {name: 'Schabowy', cuisineType: 'polska', category: 'niedzielny obiad', ingredients: 'mięso, mięso, mięso', maxPerDay: 8, remaining: 8, price: 22, description: 'do tego zmiemniaczki i surówka', imgUrls: ["../../assets/dish_images/pork-chop.jpg"], rate: 5},
        {name: 'Jajecznica', cuisineType: 'międzynarodowa', category: 'śniadanie', ingredients: 'jajka, masło', maxPerDay: 20, remaining: 20, price: 8, description: 'kremowa konsystencja', imgUrls: ["../../assets/dish_images/scrambled-eggs.jpg"], rate: 4},
        {name: 'Smoothie', cuisineType: 'międzynarodowa', category: 'podwieczorek', ingredients: 'truskawki, banan, kiwi', maxPerDay: 30, remaining: 30, price: 5, description: 'dobre, owocowe', imgUrls: ["../../assets/dish_images/smoothie.jpg"], rate: 1},
        {name: 'Taco', cuisineType: 'meksykańska', category: 'przystawka', ingredients: 'mielone mięso, warzywa', maxPerDay: 14, remaining: 14, price: 17, description: 'zestaw malych tacosow', imgUrls: ["../../assets/dish_images/taco.jpg"], rate: 3}
    ];

    public static fillDishesStore(store: AngularFirestore){
        this.dishes.forEach((dish) => {
            store.collection('dishes').add(dish);
        }) 
    }
}

