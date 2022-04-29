import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {Comment} from "../../../model/comment";
import {HttpService} from "../../../app-services/http.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  animalId: string = ''
  comment: Comment = {}

  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private location: Location) {}

  ngOnInit(): void {
    this.route.params
      .pipe(first())
      .subscribe(params => {
        this.animalId = params['id']
      })
  }

  addComment() {
    this.http.addComment(this.comment, this.animalId)
      .pipe(first())
      .subscribe(value => {
        this.location.back()
      })
  }
}
