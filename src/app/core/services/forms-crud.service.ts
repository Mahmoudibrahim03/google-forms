import { Injectable } from '@angular/core';
import { CrudModel } from '../models/crud.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { formResInterface } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormsCrudService extends CrudModel {
  public CREATE_GET_END_POINT: string = `${this.BASE_URL}forms`;
  public UPDATE_END_POINT = (id: string | number) => `${this.BASE_URL}forms/${id}`;
  public DELETE_END_POINT = (id: string | number) => `${this.BASE_URL}forms/${id}?_embed=answers&_embed=questions`;
  public GET_ONE_ITEM_END_POINT = (id: string | number, isAdmin?: boolean) => `${this.BASE_URL}forms/${id}?_embed=questions${isAdmin ? '&_embed=answers' : ''}`;

  constructor(private http: HttpClient) {
    super();
  }

  // get all forms
  getAll(): Observable<formResInterface[]> {
    return this.http.get<formResInterface[]>(this.CREATE_GET_END_POINT);
  }

  //get form with the id
  getById(id: string | number): Observable<formResInterface> {
    return this.http.get<formResInterface>(this.GET_ONE_ITEM_END_POINT(
      id,
      localStorage.getItem('isLogged') === 'true')
    );
  }

  //create form
  create(body: {
    title: string;
    description: string;
    created: string;
  }) {
    return this.http.post(this.CREATE_GET_END_POINT, body)
  }

  //delete form
  delete(id: string | number) {
    return this.http.delete(this.DELETE_END_POINT(id))
  }
}
