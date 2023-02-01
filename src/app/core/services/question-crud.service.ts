import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudModel } from '../models/crud.model';
import { Observable } from 'rxjs';
import { questionResInterface } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionCrudService extends CrudModel {

  public CREATE_GET_END_POINT: string = `${this.BASE_URL}questions`;
  public UPDATE_END_POINT = undefined;
  public DELETE_END_POINT = (id: number) => `${this.BASE_URL}questions/${id}?_embed=anwers`;
  public GET_ONE_ITEM_END_POINT = (id: number) => `${this.BASE_URL}questions/${id}`;

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  // get all questions
  getAll(): Observable<questionResInterface[]> {
    return this.http.get<questionResInterface[]>(this.CREATE_GET_END_POINT);
  }

  //get questions with the id
  getById(id: number): Observable<questionResInterface> {
    return this.http.get<questionResInterface>(this.GET_ONE_ITEM_END_POINT(id));
  }

  //create question
  create(body: questionResInterface) {
    return this.http.post(this.CREATE_GET_END_POINT, body)
  }

  //delete question and realted answers
  delete(id: number) {
    return this.http.delete(this.DELETE_END_POINT(id))
  }
}
