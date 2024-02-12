import { generateLinkedList } from './index';

interface TechNode {
  value: string | null;
  next: TechNode | null;
}

describe('generateLinkedList', () => {
  let techList: string[];
  let expectedTechNode: TechNode;

  beforeEach(() => {
    techList = [
      'JavaScript',
      'React',
      'Vue',
      'Node.js',
      'Webpack',
      'Jest',
      'TypeScript',
      'CSS',
      'HTML',
      'GraphQL',
    ];

   expectedTechNode = {
     value: 'JavaScript',
     next: {
       value: 'React',
       next: {
         value: 'Vue',
         next: {
           value: 'Node.js',
           next: {
             value: 'Webpack',
             next: {
               value: 'Jest',
               next: {
                 value: 'TypeScript',
                 next: {
                   value: 'CSS',
                   next: {
                     value: 'HTML',
                     next: {
                       value: 'GraphQL',
                       next: {
                         value: null,
                         next: null,
                       },
                     },
                   },
                 },
               },
             },
           },
         },
       },
     },
   };


  });

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const resultTechNode = generateLinkedList(techList);
    expect(resultTechNode).toStrictEqual(expectedTechNode);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const resultTechNode = generateLinkedList(techList);
    expect(resultTechNode).toMatchSnapshot();
  });
});
