// beforeEach is defined in this scope.
// eslint-disable-next-line no-undef
beforeEach(() => {
  // jest is defined in this scope.
  // eslint-disable-next-line no-undef
  const consoleErrorMock = jest.fn((err) => {
    global.errorHandler.push(err);
  });

  global.errorHandler = {
    _errors: [],
    get errors() {
      return this._errors;
    },
    push(e) {
      this._errors.push(e);
    },
    flush() {
      this._errors = [];
    },
    expectConsoleErros(flush = true) {
      if (this._errors.length === 0) {
        throw new Error('No Console Errors.');
      } else if (flush) {
        this.flush();
      }
    },
  };
  global.console.error = consoleErrorMock;
  global.console.warn = consoleErrorMock;
});

// afterEach is defined in this scope.
// eslint-disable-next-line no-undef
afterEach(() => {
  const { errors } = global.errorHandler;
  if (errors.length > 0) {
    global.errorHandler.flush();
    throw new Error(`errors Occured! \n ${errors}`);
  }
});
