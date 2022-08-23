import debounce from 'lodash/debounce';

// ======================================
// EXPORTS
// ======================================
// DEBOUNCE
export const debounceCustom = debounce((callback) => {
  callback();
}, 300);
