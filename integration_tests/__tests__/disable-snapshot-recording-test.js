/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const {makeTemplate, makeTests, cleanup} = require('../utils');
const path = require('path');
const runJest = require('../runJest');

const DIR = path.resolve(__dirname, '../disableSnapshotRecording');
const TESTS_DIR = path.resolve(DIR, '__tests__');

beforeEach(() => cleanup(TESTS_DIR));
afterAll(() => cleanup(TESTS_DIR));

test('it should fail', () => {
  const filename = 'basic.js';

  const test = `
    test('disableSnapshotRecording', () => {
      expect({}).toMatchSnapshot()
    });
  `;

  {
    makeTests(TESTS_DIR, {[filename]: test});
    const {stderr, status} = runJest(DIR, ['--recordSnapshot=false', filename]);
    expect(stderr).toMatch('Tried to record a new snapshot.');
    expect(status).toBe(1);
  }
});
