import { toPaths } from '../index';
import { expect } from 'chai';

describe('toPaths', () => {
  it('should take and object and return an array of tuples containing a path and a value', () => {
    const data = {
      Foo: {
        Bar: [1, 2, 3],
      },
      Password: 'test',
    };

    const expected = [
      ['Foo.Bar.0', 1],
      ['Foo.Bar.1', 2],
      ['Foo.Bar.2', 3],
      ['Password', 'test'],
    ];

    const paths = toPaths(data);
    expect(paths).to.eql(expected);
  });
});
