interface DataUser {
    uid: string;
    nombre: string;
    email: string;
}

export class User {
    public uid: string;
    public nombre: string;
    public email: string;

    constructor(user: DataUser) {
        this.uid = user && user.uid || null;
        this.nombre = user && user.nombre || null;
        this.email = user && user.email || null;
    }
}