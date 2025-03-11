import { Readable } from 'stream';

class ReadableStreamMock extends Readable {

  constructor() {
    super();
  }

  _read(): string {
    return 'mockData';
  }
}

export const ReadableMock: ReadableStreamMock = ((): ReadableStreamMock => {
  const r = new ReadableStreamMock();
  r.push('testUuid');
  return r;
})();



