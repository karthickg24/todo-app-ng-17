import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add an item', () => {
    it("should add an item 'foo'",  () => {
      service.addToDoItem('foo')
      expect(JSON.stringify(service.getTodoItems())).toEqual(JSON.stringify([{name: 'foo', completed: false} ]));
    });
  });

  
});
