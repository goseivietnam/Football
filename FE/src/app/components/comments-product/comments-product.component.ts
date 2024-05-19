import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment, IResViewComment } from 'src/app/interfaces/comment';

import { IUserRequest } from 'src/app/interfaces/User';
import { CommentService } from 'src/app/services/comment/comment.service';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments-product',
  templateUrl: './comments-product.component.html',
  styleUrls: ['./comments-product.component.scss'],
})
export class CommentsProductComponent {
  @Input() idPost!: string;
  @Input() comments!: IResViewComment[];
  userId!: string;
  user!: IUserRequest;
  idComment!: string;
  constructor(
    private commentService: CommentService,
    private commentForm: FormBuilder,
    private Toast: ToastrService,
    private router: Router,
    private params: ActivatedRoute
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.user._id || '';
  }

  formAddComment = this.commentForm.group({
    content: ['', [Validators.required]],
  });

  formEditComment = this.commentForm.group({
    content: ['', [Validators.required]],
  });

  get checkEditContent() {
    return this.formEditComment.get('content') as FormControl;
  }

  get checkAddContent() {
    return this.formAddComment.get('content') as FormControl;
  }

  addComment() {
    const comment: IComment = {
      userId: this.userId || '',
      postId: this.idPost || '',
      content: this.formAddComment.value.content || '',
    };

    if (!this.userId) {
      this.Toast.warning('Bạn cần phải đăng nhập');
    }

    if (this.formAddComment.valid && this.userId) {
      this.formAddComment.reset();
    }
  }

  getCommentRefPost() {
    const id = this.params.snapshot.params['id'];

    this.commentService.getViewComment(id).subscribe(({ data }) => {
      this.comments = data;
    });
  }

  handleDelete(id: string) {
    Swal.fire({
      title: 'Do you want to delete this comment?',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.commentService.deleteComment(id).subscribe(() => {
          this.getCommentRefPost();
        });
      }
    });
  }

  getDetailComment(id: string) {
    this.idComment = id;
    this.commentService.getDetailComment(id).subscribe((comment) => {
      this.formEditComment.patchValue({
        content: comment.data.content,
      });
    });

    // Swal.fire({
    //   title: 'Chỉnh sửa bình luận',
    //   html: `<form>
    //           <textarea id="content" class="form-control" id="textAreaExample"
    //               rows="4" style="background: #fff;">
    //           </textarea>
    //         </form>`,
    //   confirmButtonText: 'Save',
    //   focusConfirm: false,
    // }).then((result) => {
    //   if (result.value) {
    //   }
    // });
  }

  handleEdit(id: string) {
    const comment: IComment = {
      userId: this.userId || '',
      postId: this.idPost || '',
      content: this.formEditComment.value.content || '',
    };

    if (this.formEditComment.valid) {
      this.commentService.updateComment(id, comment).subscribe(() => {
        // this.modal.nativeElement.style.display = 'none';
        this.getCommentRefPost();
      });
    }
  }
}
