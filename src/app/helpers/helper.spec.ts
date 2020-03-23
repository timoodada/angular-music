import {deepMerge} from './util';

describe('Helper', () => {

  it('test deepMerge', () => {
    const ret: any = deepMerge({
      a: 1,
      b: {
        c: 1,
        e: 5
      }
    }, {
      a: 2,
      b: {
        c: 3,
        d: 4
      }
    });
    expect(ret.a).toEqual(2);
    expect(ret.b.c).toEqual(3);
    expect(ret.b.d).toEqual(4);
    expect(ret.b.e).toEqual(5);
  });
});
