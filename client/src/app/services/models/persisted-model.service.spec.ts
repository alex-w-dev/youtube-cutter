import { TestBed } from '@angular/core/testing';

import { PersistedModelService } from './persisted-model.service';

describe('PersistedModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersistedModelService = TestBed.get(PersistedModelService);
    expect(service).toBeTruthy();
  });
});
