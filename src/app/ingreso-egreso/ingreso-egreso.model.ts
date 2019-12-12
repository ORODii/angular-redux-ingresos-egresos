interface Data {
    uid?: string;
    descripcion: string;
    monto: number;
    tipo: string;
}

export class IngresoEgreso {
    public uid: string;
    public descripcion: string;
    public monto: number;
    public tipo: string;

    constructor(data: Data) {
        this.descripcion = data && data.descripcion || null;
        this.monto = data && data.monto || null;
        this.tipo = data && data.tipo || null;
    }
}