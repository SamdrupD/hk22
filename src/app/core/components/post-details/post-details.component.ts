import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { distinctUntilChanged, filter } from 'rxjs';
import { uniqBy } from 'lodash-es';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CardCreationComponent } from './card-creation/card-creation.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

   id: string = '';
   post: any = '';
   cards!: any[];

  constructor(private api: ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit(): void {
   this.route.paramMap.pipe(distinctUntilChanged()).subscribe(paramMap => {
            if (paramMap.get('id')) {
                this.id = paramMap.get('id') as string;
            }
        })
       this.getJobs();
       this.getCards();
  }

   getJobs(): void {
     this.api.getAllJobs()
      .pipe(
        filter(res => !!res)
      )
      .subscribe(res => {
        res.forEach((ans: any) => {
        //DYNAMIC USER
          if (ans.id === this.id) {
          this.post = ans;
          }
        });
      });
  }

  goBack() {
    window.history.back();
  }

  cardCreation() {
     this.dialog.open(CardCreationComponent, {
      width: '500px',
      data: this.id
  }).afterClosed().pipe(filter( value => !!value)).subscribe(res => {
        this.api.postCard(res);
        this.getCards();
  });
  }

  private getCards() {
    this.api.getCards().subscribe( res => {
        this.cards = res;
    })
  }
}