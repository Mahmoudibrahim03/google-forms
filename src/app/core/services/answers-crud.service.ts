import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudModel } from '../models/crud.model';
import { Observable, switchMap, take } from 'rxjs';
import { answerResInterface } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class AnswersCrudService extends CrudModel {

  public CREATE_GET_END_POINT: string = `${this.BASE_URL}answers`;
  public UPDATE_END_POINT = (id: number | string) => `${this.BASE_URL}answers/${id}`;
  public DELETE_END_POINT = (id: number | string) => `${this.BASE_URL}answers/${id}`;
  public GET_ONE_ITEM_END_POINT = (id: number | string) => `${this.BASE_URL}answers/${id}`;
  public GET_USER_IP_END_POINT = `https://api64.ipify.org?format=json`;
  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  // get all answers
  getAll(): Observable<answerResInterface[]> {
    return this.http.get<answerResInterface[]>(this.CREATE_GET_END_POINT);
  }

  //get answer with the id
  getById(id: number): Observable<answerResInterface> {
    return this.http.get<answerResInterface>(this.GET_ONE_ITEM_END_POINT(id));
  }

  //create answer
  create(body: any) {
    // console.log('asdasdasdasdad')
    // return this.http.get(this.GET_USER_IP_END_POINT).pipe(
    //   take(1),
    //   switchMap((res: any) => {
    //     body.userToken = res.ip;
    return this.http.post(this.CREATE_GET_END_POINT, body);
    //   }),
    // )
  }

  //delete answer
  delete(id: number) {
    return this.http.delete(this.DELETE_END_POINT(id));
  }
}
