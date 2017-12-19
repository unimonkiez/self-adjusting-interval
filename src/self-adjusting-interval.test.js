import setSelfAdjustingInterval from './self-adjusting-interval';

const createMocks = (mocksToMerge) => {
  const setTimeouts = [];
  const mocks = {
    Date: {
      now: jest.fn().mockReturnValue(0),
    },
    setTimeout: jest.fn().mockImplementation((cb) => { setTimeouts.push(cb); }),
    ...mocksToMerge,
  };
  const original = {
    Date: global.Date,
    setTimeout: global.setTimeout,
  };

  Object.keys(mocks).forEach((k) => {
    global[k] = mocks[k];
  });

  return {
    mocks,
    actions: {
      triggerSetTimeout() {
        const cb = setTimeouts.shift();
        cb();
      },
    },
    restore() {
      Object.keys(original).forEach((k) => {
        global[k] = original[k];
      });
    },
  };
};

describe('self-adjusting-interval', () => {
  it('is a function', () => {
    expect(typeof setSelfAdjustingInterval).toBe('function');
  });
  describe('should call given function', () => {
    it('once with one tick', () => {
      const {
        actions: {
          triggerSetTimeout,
        },
        restore,
      } = createMocks();
      const cb = jest.fn();
      const stopSelfAdjustingInterval = setSelfAdjustingInterval(cb, 10);
      triggerSetTimeout();
      stopSelfAdjustingInterval();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(1);
      restore();
    });
    it('once with 3 ticks if 3 times the expected time has passed', () => {
      const {
        actions: {
          triggerSetTimeout,
        },
        restore,
      } = createMocks({
        Date: {
          now: jest.fn()
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(30),
        },
      });

      const cb = jest.fn();
      const stopSelfAdjustingInterval = setSelfAdjustingInterval(cb, 10);
      triggerSetTimeout();
      stopSelfAdjustingInterval();
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith(3);
      restore();
    });
  });
});
