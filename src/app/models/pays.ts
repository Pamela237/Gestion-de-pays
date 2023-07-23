export class Pays {
    id!: number;
    nom: string;
    population!: number;
    superficie!: number;
    continent!: string;
    produitInterieurBrut!: number;
    image!: string;
    [key: string]: string | number;

    constructor(data: any = {}) {
        this.id = data.id;
        this.nom = data.nom;
        this.population = data.population;
        this.superficie = data.superficie;
        this.continent = data.continent;
        this.produitInterieurBrut = data.produitInterieurBrut;
        this.image = data.image;
    }


}