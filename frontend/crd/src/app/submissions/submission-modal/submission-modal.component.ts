import { Component, Inject, OnDestroy } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/security/auth.service';
import { Task } from 'src/domain/Task';
import { Submission } from 'src/domain/Submission';
import { ArtifactService } from 'src/app/file-upload/artifact.service';

@Component({
  selector: 'app-submission-modal',
  templateUrl: './submission-modal.component.html',
  styleUrls: ['./submission-modal.component.less']
})
export class SubmissionModalComponent implements OnDestroy {
  modalState: 'nominal' | 'cancelling' | 'submitting' = 'nominal';
  submitted: boolean = false;
  artifactId: number = 0;
  commentString: string = '';
  url: string;
  task: Task;

  private readonly closeTime: number = 100;

  constructor(
    private readonly submissionService: SubmissionService,
    private readonly artifactService: ArtifactService,
    private readonly authService: AuthService,
    private readonly submissionModalRef: MatDialogRef<SubmissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      url: string,
      task: Task 
    },
  ) { 
    this.task = this.data.task;
    this.url = this.data.url;
  }

  ngOnDestroy(): void {
    if (this.artifactId !== 0 && this.modalState !== 'submitting') {
      this.artifactService.deleteArtifact(this.artifactId).subscribe(() => {
        setTimeout(() => this.submissionModalRef.close(), this.closeTime);
      });
    } else {
      setTimeout(() => this.submissionModalRef.close(), this.closeTime);
    }
  }

  onSubmit() {
    this.authService.user$.subscribe((user) => {
      const submission = Submission.make(
        this.artifactId,
        this.task.taskID,
        user!.id,
        new Date(Date.now()),
        this.commentString
      );
      this.submissionService.submit(submission).subscribe(() => {
        this.modalState = 'submitting';
        setTimeout(() => this.submissionModalRef.close(), this.closeTime);
      });
    });
  }

  onCancel() {
    this.modalState = 'cancelling';
    setTimeout(() => this.submissionModalRef.close(), this.closeTime);
  }

  isEnabled(): boolean {
    return this.modalState === 'nominal';
  }

  canSubmit(): boolean {
    return this.artifactId > 1 && this.task.needsArtifact!;
  }

  onArtifactId(id: number) {
    this.artifactId = id;
  }
}
