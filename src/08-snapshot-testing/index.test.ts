import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
     const elements = [1, 2, 3];
     const resultLinkedList = generateLinkedList(elements);

     expect(resultLinkedList).toMatchSnapshot();
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
     const elements = [2, 5, 6];
     const resultLinkedList = generateLinkedList(elements);
     
     expect(resultLinkedList).toMatchSnapshot();
  });
});
