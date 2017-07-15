import { isNumber } from './index';

const getRef = (key) => isNumber(key) ? [] : {}; //eslint-disable-line

const setter = (obj) => (
  (path, value) => {
    const list = path.split('.');
    const last = list.length - 1;

    return list.reduce((context, key, i) => { // eslint-disable-line
      if (i < last) {
        const nextKey = list[i + 1];
        context[key] = context[key] ? context[key] : getRef(nextKey);
        return context[key];
      } else {
        if (value === '<<EmptyArray>>') {
          value = [];
        } else if (value === '<<EmptyString>>') {
          value = '';
        }
        context[key] = value;
      }
    }, obj);
  }
);

export default function fromPaths(paths) {
  const obj = {};
  const set = setter(obj);
  paths.forEach((tuple) => set(...tuple));
  return obj;
}
