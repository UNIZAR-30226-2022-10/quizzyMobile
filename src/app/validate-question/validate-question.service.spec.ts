import { TestBed } from '@angular/core/testing';

import { ValidateQuestionService } from './validate-question.service';

describe('ValidateQuestionService', () => {
  let service: ValidateQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
