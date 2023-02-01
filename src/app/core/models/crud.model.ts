import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export abstract class CrudModel {
  readonly BASE_URL = environment.BASE_URL;
  abstract CREATE_GET_END_POINT: string;
  abstract UPDATE_END_POINT?: (id: number, formId?: string) => string;
  abstract DELETE_END_POINT: (id: number, formId?: string) => string;
  abstract GET_ONE_ITEM_END_POINT: (id: number, isAdmin?: boolean) => string;


  abstract getAll(): Observable<Object>; //Get

  abstract getById(id: number): void; //Get

  abstract create(body: any): Observable<Object>; //Post

  abstract delete(id: number): void; //Delete
}
