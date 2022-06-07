import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TalkService } from '../../../services/talk.service';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-talent-details',
  templateUrl: './talent-details.component.html',
  styleUrls: ['./talent-details.component.scss']
})
export class TalentDetailsComponent implements OnInit {

  workerDetails: any;
  id: any;
  comments: any;
  user = JSON.parse(localStorage.getItem('current user') || '');

  reviewList = [{
     name: 'Sonam Usui',
     profile: 'https://picsum.photos/1000/1000',
     comments: 'You are ugly as shit!'
  },
  {
     name: 'Boss',
     profile: 'https://picsum.photos/1000/1000',
     comments: 'Look at that sky! I so want to be there.. Can we arrange a trip? Is that a possibility? Please!!!'
  }
  ]
  bookmarkedTalentLists: any;
  constructor(private talkService: TalkService, private route: ActivatedRoute, private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
   this.route.paramMap.subscribe(paramMap => {
            if (paramMap.get('id')) {
                this.id = paramMap.get('id') as string;
            }
        })
        this.api.getWorkersDetails(this.id).subscribe(data => {
          this.workerDetails = data;
        })
         this.api.getBookmarkedList(this.user.id).subscribe(res => {
        this.bookmarkedTalentLists = res;
      })
  }

  openChat() {
      this.talkService.otherApplicationUser = {
        id: this.workerDetails.user.id,
        username: this.workerDetails.user.name,
        email: this.workerDetails.user.email,
        photoUrl: 'https://testasmpublic-14e65.kxcdn.com/1652999675_56815616dbd7146cd2745998abe861_harry-potter-book-sets.jpg.webp',
        welcomeMessage: 'Hey there! How are you? :-)',
        role: this.workerDetails.user.roles
      }
      this.router.navigate(['core/chats']);
    }

  submitComment() {
    this.reviewList.push({
      name: this.user.name,
      profile: 'https://picsum.photos/1000/1000',
      comments: this.comments
    })
    this.comments = '';
  }

   setBookmarked() {
     this.api.setBookmarkMark(this.user.id, this.id).subscribe(() => {
        Swal.fire('Talent bookmarked successfully!', '', 'success');
        this.ngOnInit();
      })
  }

  removeBookmarked(){
  this.api.removeBookMark(this.user.id, this.id).subscribe( () => {
     Swal.fire('Removed bookmarked successfully!', '', 'success');
        this.ngOnInit();
    });
  }
   isBookmarked() {
     return this.bookmarkedTalentLists.some((res: any) => res.user.id === this.id);
  }
}
