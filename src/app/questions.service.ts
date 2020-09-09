import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Quiz, Question } from './quiz.model';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  // public getJSON(fileId: string) {
  //   return this.http.get(`./assets/${fileId}.json`) as Observable<any>;
  // }

  public getQuizzes() {
    return this.http.get(`./assets/quiz-list.json`).pipe(
      map((result: any[]) => {
        return result.map(
          (result) =>
            new Quiz(
              result.label,
              result.name,
              result.description,
              result.fileName
            )
        );
      })
    );
  }

  public getQuestions(fileName: string) {
    return this.http.get(`./assets/${fileName}.json`).pipe(
      map((result: any[]) => {
        return result.map(
          (result) => new Question(result.label, result.choices)
        );
      })
    );
  }
}
