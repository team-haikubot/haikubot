const profanityFilter = require('../../lib/utils/profanityFilter');

it('filters bad words', () => {
  const str = 'Fuck this';
  expect(() => profanityFilter(str)).toThrow();
});
