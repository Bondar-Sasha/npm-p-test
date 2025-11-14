#!/usr/bin/env node

/**
 * The script loads the provided package.json file and updates its
 * "version" field to the value passed as the second argument.
 */

import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const [, , packageJsonArg, newVersion] = process.argv;

if (!packageJsonArg || !newVersion) {
  console.error('Usage: node checkHashes.js <path-to-package.json> <new-version>');
  process.exit(1);
}

const packageJsonPath = path.resolve(packageJsonArg);

try {
  const content = readFileSync(packageJsonPath, 'utf-8');
  const pkg = JSON.parse(content);
  pkg.version = newVersion;
  writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}`, 'utf-8');
  console.log(`Updated version in ${packageJsonPath} to ${newVersion}`);
} catch (error) {
  console.error(`Failed to update ${packageJsonPath}: ${error.message}`);
  process.exit(1);
}
