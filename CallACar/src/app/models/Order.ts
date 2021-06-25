import { User } from './User';
import { Car } from './Car';

export class Order{
    user: string
    startLocation: string
    endLocation: string
    startTime: string
    endTime: string
    car: string
    drivenKm: number
    cost: number

    constructor(user: string, startLocation: string, endLocation: string, startTime: string, endTime: string, car: string, drivenKm: number, cost: number){
        this.user = user
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.startTime = startTime
        this.endTime = endTime
        this.car = car
        this.drivenKm = drivenKm
        this.cost = cost
    }
}