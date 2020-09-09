import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  quizList: Quiz[];

  constructor(public questionsService: QuestionsService) {}

  ngOnInit() {
    this.questionsService.getQuizzes().subscribe((quiz) => {
      this.quizList = quiz;
    });
  }
  reset() {
    this.quizList = undefined;
  }
}
