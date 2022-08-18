import _ from 'lodash';

// ======================================
// REUSABLE
// ======================================

const lodashPick = (array, keys) => _.pick(array, keys);

// ======================================
// EXPORTS
// ======================================
// DEBOUNCE
export const debounceCustom = _.debounce((callback) => {
  callback();
}, 300);

// FILTER ARRAY
export const lodashFilterArray = (array, keys) => {
  let newArray = [];

  array.forEach((item) => {
    const newObj = lodashPick(item, keys);

    newArray.push({
      id: newObj.id,
      text: `${newObj.firstName} ${newObj.lastName}`,
    });
  });

  return newArray;
};

// CAMEL CASE
export const camelLodash = (text) => _.camelCase(text);

export const inverseCamelLodash = (text) =>
  _.startCase(text.replace(/([A-Z])/g, ' $1'));

// To Check if object is empty
export const isEmptyLodash = (text) => _.isEmpty(text);
