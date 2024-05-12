import { normalizeURL, getURLsFromHTML } from './crawl.js';
import { test, expect } from '@jest/globals';

test('HTTPS Url processed correctly', () => {
  expect(normalizeURL('https://google.com')).toEqual('google.com');
});

test('HTTPS Url with slash processed correctly', () => {
  expect(normalizeURL('https://google.com/')).toEqual('google.com');
});

test('HTTP Url processed correctly', () => {
  expect(normalizeURL('http://google.com/')).toEqual('google.com');
});

test('HTTP Url with slash processed correctly', () => {
  expect(normalizeURL('http://google.com/')).toEqual('google.com');
});

test('HTTPS Url with two slash processed correctly', () => {
  expect(normalizeURL('https://google.com//')).toEqual('google.com');
});

test('HTTP Url with two slash processed correctly', () => {
  expect(normalizeURL('http://google.com//')).toEqual('google.com');
});

test('HTTPS Url with with subdomain processed correctly', () => {
  expect(normalizeURL('https://mail.google.com/')).toEqual('mail.google.com');
});

test('HTTP Url with with subdomain processed correctly', () => {
  expect(normalizeURL('http://mail.google.com/')).toEqual('mail.google.com');
});

test('relative URLs are converted to absolute URLs', () => {
  const htmlBody =
    '<!DOCTYPE html><html><head><title>1231231</title><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></head><body><a href="/about"><span>GotoBoot.dev</span></a></body></html>';
  const baseURL = 'https://blog.boot.dev';
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    'https://blog.boot.dev/about',
  ]);
});

test('find all the <a> tags in a body of HTML', () => {
  const htmlBody =
    '<!DOCTYPE html><html><head><title>1231231</title><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></head><body><a href="https://blog.boot.dev/about1"><span>GotoBoot.dev</span></a><a href="https://blog.boot.dev/about2"><span>GotoBoot.dev</span></a><a href="https://blog.boot.dev/about3"><span>GotoBoot.dev</span></a></body></html>';
  const baseURL = 'https://blog.boot.dev';
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    'https://blog.boot.dev/about1',
    'https://blog.boot.dev/about2',
    'https://blog.boot.dev/about3',
  ]);
});

test('relative and absolute URLs can be found', () => {
  const htmlBody =
    '<!DOCTYPE html><html><head><title>1231231</title><meta http-equiv="Content-Type" content="text/html;charset=UTF-8"></head><a href="/about"><span>GotoBoot.dev</span></a><a href="https://blog.boot.dev/about1"><span>GotoBoot.dev</span></a></body></html>';
  const baseURL = 'https://blog.boot.dev';
  expect(getURLsFromHTML(htmlBody, baseURL)).toEqual([
    'https://blog.boot.dev/about',
    'https://blog.boot.dev/about1',
  ]);
});
