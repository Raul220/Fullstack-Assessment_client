import { render, screen } from '@testing-library/react';

describe('getClass must return if a string is an email, url, user, hash-tag or text', () => {
  test('getClass expect email', () => {
    expect(getClass('vitocorleone@gf.com')).toBe('email');
  });
});

describe('getClass must return if a string is an email, url, user, hash-tag or text', () => {
  test('getClass expect hash-tag', () => {
    expect(getClass('#KillFredo')).toBe('hash-tag');
  });
});

describe('getClass must return if a string is an email, url, user, hash-tag or text', () => {
  test('getClass expect text', () => {
    expect(getClass('return')).toBe('text');
  });
});

describe('getClass must return if a string is an email, url, user, hash-tag or text', () => {
  test('getClass expect user', () => {
    expect(getClass('@fredo')).toBe('user');
  });
});

describe('getClass must return if a string is an email, url, user, hash-tag or text', () => {
  test('getClass expect url', () => {
    expect(getClass('www.google.com')).toBe('url');
  });
});

describe('isValidHttpUrl must return true if string is an url', () => {
  test('isValidHttpUrl expect true', () => {
    expect(isValidHttpUrl('www.google.com')).toBe(true);
  });
});

describe('isValidHttpUrl must return false if string is not an url', () => {
  test('isValidHttpUrl expect false', () => {
    expect(isValidHttpUrl('#Sony')).toBe(false);
  });
});

function getClass(text){
  var email = /\S+@\S+\.\S+/;
  var span = '';
  if(email.test(text)){
      span= 'email';
  } else if (isValidHttpUrl(text)){
      span = 'url';
  } else if (text.charAt(0) === '@' && text.replace(/[^@]/g, "").length === 1){
      span = 'user';
  } else if (text.charAt(0) === '#' && text.replace(/[^#]/g, "").length === 1){
      span = 'hash-tag';
  } else {
      span = 'text';
  }
  return span;
}
function isValidHttpUrl (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
