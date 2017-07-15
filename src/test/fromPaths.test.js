import { fromPaths, toPaths } from '../index';
import { assert } from 'chai';

describe('fromPaths', () => {
  it('returns an object from an array of DollDB Item Paths', () => {
    const data = {
      Favorites: [],
      Foo: {
        Bar: {
          Empty: [],
          Fiz: [1, '2', 3, {
            A: 'B',
            C: 'D',
          }],
          Baz: 'Hello',
        },
      },
    };

    const paths = toPaths(data);

    const dataFromPaths = fromPaths(paths);

    assert.deepEqual(dataFromPaths, data);
  });
});
