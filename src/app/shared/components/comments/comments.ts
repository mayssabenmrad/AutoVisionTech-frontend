import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarComment } from 'src/app/core/models';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.html',
  styleUrls: ['./comments.css']
})
export class Comments {

  @Input() comments: CarComment[] = [];
  @Input() carId!: string;
  @Output() commentAdded = new EventEmitter<void>(); // Change: emit just a refresh signal

  constructor(private commentService: CommentService, private cdr: ChangeDetectorRef) {}

  isSubmitting: boolean = false;

  // Message properties
  showMessage: boolean = false;
  message: { type: 'success' | 'error'; text: string } = { type: 'success', text: '' };
  isHiding = false;
  
  // Comment form
  commentForm = {
    name: '',
    content: ''
  };

    // Form validation
  isFormValid(): boolean {
    return this.commentForm.name.trim().length > 0 && this.commentForm.content.trim().length > 0;
  }

  // Display a message
  private displayMessage(type: 'success' | 'error', text: string) {
    this.showMessage = true;
    this.message = { type, text };
    this.isHiding = false;

    setTimeout(() => {
      this.isHiding = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 500);
    }, 5000);
  }

  // After clicking "publish review"
  onSubmit() : void{
    // Validation
    if (!this.isFormValid()) {
      this.displayMessage('error', 'Please provide a rating and comment content.');
      return;
    }

    this.isSubmitting = true;
    this.cdr.detectChanges(); // Update UI

    this.commentService.addComment({
      name: this.commentForm.name, 
      content: this.commentForm.content, 
      carId: this.carId
    }).subscribe({
      next: (response) => {
        this.displayMessage('success', 'Comment submitted successfully!');
        // Reset form
        this.commentForm.name = '';
        this.commentForm.content = '';
        this.isSubmitting = false;
        this.cdr.detectChanges(); // Update UI
        this.commentAdded.emit(); // Emit event to notify parent component
      },
      error: (error) => {
        this.displayMessage('error', error.error?.message || 'Failed to submit comment.');
        this.isSubmitting = false;
        this.cdr.detectChanges(); // Update UI
        this.commentAdded.emit(); // Emit event to notify parent component
      }
    });
  }

  // Format date correctly
  formatDate(date: string): string {
    return date.substring(0, 10);
  }
}