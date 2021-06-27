export class User{
    _id: string
    name: string
    password: string
    admin: boolean
    age: number
    driversLicense: boolean
    homeAddress: string
    activeCar: boolean
    consent: boolean

    constructor(_id: string, name: string, password: string, admin: boolean, age: number, driversLicense: boolean, homeAddress: string, activeCar: boolean, consent: boolean){
        this._id = _id
        this.name = name
        this.password = password
        this.admin = admin
        this.age = age
        this.driversLicense = driversLicense
        this.homeAddress = homeAddress
        this.activeCar = activeCar
        this.consent = consent
    }
}