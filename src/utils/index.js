export const isObject = obj => obj && obj.constructor && obj.constructor === Object;
export const isNumber = val => /^\d+$/.test(val);

export { default as docClient } from './docClient';
export { default as CreateDocClient } from './CreateDocClient';
export { default as toPaths } from './toPaths';
export { default as fromPaths } from './fromPaths';
export { default as Put } from './Put';
