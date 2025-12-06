import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.html',
  styleUrls: ['./comments.css']
})
export class Comments {
  // Comment list
  comments: Comment[] = [
    {
      id: '1',
      name: 'John Smith',
      content: 'Amazing car! The performance is outstanding and the interior is luxurious. Highly recommend!',
      createdAt: new Date('2024-12-01')
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      content: 'I visited the showroom last week. The car looks even better in person. The team was very helpful.',
      createdAt: new Date('2024-12-03')
    },
    {
      id: '3',
      name: 'Michael Brown',
      content: 'Great value for money. The mileage is low and the condition is excellent.',
      createdAt: new Date('2024-12-05')
    }
  ];

  // Comment form
  commentForm = {
    name: '',
    content: ''
  };

  // Submit a comment
  onSubmit(): void {
    if (this.commentForm.name.trim() && this.commentForm.content.trim()) {
      const newComment: Comment = {
        id: this.generateId(),
        name: this.commentForm.name.trim(),
        content: this.commentForm.content.trim(),
        createdAt: new Date()
      };

      // Add the comment to the beginning of the list
      this.comments.unshift(newComment);

      // Reset the form
      this.commentForm = {
        name: '',
        content: ''
      };
    }
  }

  // Format the date
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Generate a unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}