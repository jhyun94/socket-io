var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should get correct response', () => {
    var res = generateMessage('bobo', 'its bobo');
    expect(res.from).toBe('bobo')
    expect(res.text).toBe('its bobo');
    expect(res.createdAt).toBeA('number');
  })
})

describe('generateLocation', () => {
  it('should get the current url', () => {
    var latitude = 1.43;
    var longitude = 2.1;
    var res = generateLocationMessage('User', latitude, longitude);
    expect(res.from).toBe('User');
    expect(res.url).toBe('https://www.google.com/maps?q=1.43,2.1');
  })
})
