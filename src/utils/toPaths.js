import { isObject, isNumber } from './index';

function push(arr, name, value) {
  if (isObject(value)) {
    arr.push(...reduceObject(value, [], name));
  } else if (Array.isArray(value) && value.length > 0) {
    arr.push(...arrayToPaths(value, name));
  } else if (Array.isArray(value) && value.length === 0) {
    arr.push([name, '<<EmptyArray>>']);
  } else if (value === '') {
    arr.push([name, '<<EmptyString>>']);
  } else {
    arr.push([name, value]);
  }
}

function arrayToPaths(arr, prefix) {
  const output = [];
  arr.forEach((val, i) => {
    const name = `${prefix}.${i}`;
    push(output, name, val);
  });
  return output;
}

function reduceObject(object, initialValue, prefix) {
  return Object.entries(object).reduce((a, [key, value]) => {
    const name = prefix ? `${prefix}.${key}` : key;
    if (isNumber(key)) {
      throw new Error(`Object has key ${name} which is a number. This is not allowed.`);
    }
    push(a, name, value);
    return a;
  }, initialValue);
}

export default function toPaths(d) {
  if (!isObject(d)) {
    throw new Error(`toPaths expects an Object got ${d}`);
  }
  return reduceObject(d, []);
}
