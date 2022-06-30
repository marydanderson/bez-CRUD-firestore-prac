import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Tutorial from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  @Input() tutorial?: Tutorial //from parent "tutorials-list" component, currentTutorial clicked on is assigned to this
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = { //blank initialized tutorial to assign retrieved firestore input to
    title: '',
    description: '',
    published: false
  };
  message = '';


  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial }
    console.log('current tutorial w/ ...', this.currentTutorial)
  }

  updatePublished(status: boolean) {
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, { published: status })
        .then(() => {
          this.currentTutorial.published = status;
          this.message = 'The status was successfully updated!';
        })
      .catch(err => console.log(err))
    }
  }

  updateTutorial() {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description
    };
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, data)
        .then(() => this.message = 'The tutorial was updated!')
        .catch(err => console.log(err));
    };
  }

  deleteTutorial() {
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'the tutorial was deleted!';
        })
      .catch(err => console.log(err))
    };
  }

}
