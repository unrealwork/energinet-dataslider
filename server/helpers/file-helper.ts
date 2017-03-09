import * as fs from 'fs';
const configPath = 'config.json';

import * as path from 'path';
const appDir = path.dirname(require.main.filename);

export function getConfig(): any {
  return fs.readFileSync(`${appDir}/${configPath}`).toJSON();
}
