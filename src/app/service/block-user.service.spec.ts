import { TestBed } from '@angular/core/testing';

import { BlockUserService } from './block-user.service';

describe('BlockUserService', () => {
  let service: BlockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
