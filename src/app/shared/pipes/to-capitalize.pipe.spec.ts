import { ToCapitalizePipe } from './to-capitalize.pipe';

describe('ToCapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new ToCapitalizePipe();
    expect(pipe).toBeTruthy();
  });
});
