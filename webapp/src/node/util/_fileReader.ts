import { readFileSync } from 'fs';

export function readJSONFile (filepath: string) {
  let data: any;
  try {
    data = readFileSync(filepath, 'utf8');
  } catch (o_0) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (o_0) {
    return null;
  }
}
