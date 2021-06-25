export class Car{
    _id: string
    brand: string
    type: string
    drivenKm: number    
    available: boolean
    carClass: string

    constructor(_id: string, brand: string, type: string, drivenKm: number, carClass: string, available: boolean){
        this._id = _id
        this.brand = brand
        this.type = type
        this.drivenKm = drivenKm
        this.available = available
        this.carClass = carClass
    }
}
