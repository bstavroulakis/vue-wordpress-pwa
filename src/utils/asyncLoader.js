export const asyncLoader = path => {
  return resolve => require([path], m => resolve(m.default));
};