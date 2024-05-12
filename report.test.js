import { expect, test } from '@jest/globals';
import { sortPages } from './report.js';

test('pages object sorted correctly', () => {
  const originalObj = {
    'wagslane.dev/tags/clean-code': 1,
    'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2,
    'wagslane.dev/tags': 62,
    'wagslane.dev/tags/business': 1,
    'wagslane.dev/about': 62,
    'wagslane.dev/posts/dark-patterns': 2,
    'wagslane.dev/index.xml': 62,
    'wagslane.dev': 63,
  };
  const expectedObj = {
    'wagslane.dev': 63,
    'wagslane.dev/tags': 62,
    'wagslane.dev/about': 62,
    'wagslane.dev/index.xml': 62,
    'wagslane.dev/tags/business': 1,
    'wagslane.dev/posts/dark-patterns': 2,
    'wagslane.dev/posts/things-i-dont-want-to-do-to-grow-business': 2,
    'wagslane.dev/tags/clean-code': 1,
  };
  expect(sortPages(originalObj)).toEqual(expectedObj);
});

test('null pages object case', () => {
  const originalObj = {};
  const expectedObj = {};
  expect(sortPages(originalObj)).toEqual(expectedObj);
});
