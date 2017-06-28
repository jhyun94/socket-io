var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should get correct response', () => {
    var res = generateMessage('bobo', 'its bobo');
    expect(res.from).toBe('bobo')
    expect(res.text).toBe('its bobo');
    expect(res.createdAt).toBeA('number');
  })
})