#! /usr/bin/env node

const split = require('split2');
const Parse = require('fast-json-parse');
const format = require('./lib/format');

const isPinoLine = line => {
  return (
    line &&
    line.hasOwnProperty('hostname') &&
    line.hasOwnProperty('pid') &&
    (line.hasOwnProperty('v') && line.v === 1)
  );
};

process.stdin
  .pipe(
    split(data => {
      const parsed = new Parse(data);
      const value = parsed.value;
      if (parsed.err || !isPinoLine(value)) {
        return `${data}\n`;
      }
      return JSON.stringify(format(value)) + '\n';
    }),
  )
  .pipe(process.stdout);
