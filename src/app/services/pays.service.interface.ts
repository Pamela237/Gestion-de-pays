import { Observable } from "rxjs";
import { Pays } from "../models/pays";

export interface IPayService {

    getPays(): Observable<Pays[]>;

    getPaysById(id: number): Observable<Pays | undefined>

    addPays(newpays: Pays): Observable<number>;

    updatePays(indexOrId: number, paysToUpdate: Pays): Observable<number |string>;

    deletePays(paysId: number): Observable<string>;
}