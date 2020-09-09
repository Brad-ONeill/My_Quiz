import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';

@Component({
  selector: 'app-root',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})

// export class AppComponent {
export class QuestionsComponent implements OnInit {
  quiz: Quiz;
  answers: Answers;
  questions: Question[];
  currentQuestionIndex: number;

  private showResults = false;

  // constructor(private questionsService: QuestionsService) {
  //   this.questionsService.getJSON('game').subscribe((data) => {
  //     this.quiz = new Quiz('game', data);
  //     this.answers = new Answers();
  //     this.currentQuestionIndex = 0;
  //   });
  // }
  constructor(
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {}

  ngOnInit() {
    this.questionsService
      .getQuestions(this.route.snapshot.params.quizId)
      .subscribe((questions) => {
        this.questions = questions;
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }
  reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }
}
