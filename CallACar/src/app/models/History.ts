import { User } from './User';
import { Car } from './Car';

export class History{
    user: User
    car: Car
    usedKm: number

    constructor(user: User, car: Car, usedKm: number){
        this.user = user
        this.car = car
        this.usedKm = usedKm
    }
}