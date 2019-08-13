import * as path from 'path';

import { readJSONFile } from './_fileReader';

const webpackAssetsFilename = 'webpack-assets.json';

const assetsStorage = (process.env.NODE_ENV === 'production')
  ? { assets: readJSONFile('./' + webpackAssetsFilename) }
  : {
    get assets() {
      const buildRoot = process.env.BUILD_ROOT!;
      return readJSONFile(path.resolve(buildRoot, webpackAssetsFilename));
    }
  };

export const staticPath = (process.env.NODE_ENV === 'production')
    ? 'static'
    : path.resolve(process.env.ROOT!, 'static');

export const resolve = (bundleName: string, assetType: 'js' | 'css' = 'js') => {
  const { assets } = assetsStorage;

  if (!assets) {
    return null;
  }

  if (!(bundleName in assets)) {
    return null;
  }

  if (!(assetType in assets[bundleName])) {
    return null;
  }

  return assets[bundleName][assetType] as string;
};
