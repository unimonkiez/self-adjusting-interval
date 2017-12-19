import setSelfAdjustingInterval from './self-adjusting-interval';

const index = require('./index');

describe('should export', () => {
  it('self-adjusting-interval as module', () => {
    expect(index).toBe(setSelfAdjustingInterval);
  });
});
