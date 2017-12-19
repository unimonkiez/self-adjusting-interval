export default (cb, ms) => {
  let expected = Date.now() + ms;
  let stop = false;

  const step = () => {
    if (stop) {
      return;
    }

    const delta = Date.now() - expected;
    const ticks = Math.max(1, 1 + Math.round(delta / ms));
    cb(ticks);
    const addToExpected = ms * ticks;
    expected += addToExpected;

    setTimeout(step, addToExpected - delta);
  };

  setTimeout(step, ms);

  const stopInterval = () => {
    stop = true;
  };

  return stopInterval;
};
