'use strict';
import {CacherOptions} from './cacher-options.interface';
import {Request} from 'express';
import * as fs from 'fs';
import {referrerYear} from './url-helper';

const logger = require('npmlog');
const hash = require('object-hash');

export class Cacher {
  private cacheFolder: string;
  private timeToLive: number;

  constructor(options: CacherOptions) {
    this.cacheFolder = options.cacheFolder;
    this.timeToLive = options.ttl;
  }

  public cache(req: Request, callback: (isCached: boolean, fileName: string) => any): void {
    const body = req.body;
    // Cashing data
    const filename = this.cacheFolder + '/' + hash(req.originalUrl) + hash(body);
    const currentYear = new Date().getFullYear();
    const rYear = referrerYear(req.header('referer'));
    console.log('cache', 'filename %j', filename);
    fs.exists(filename, function (exist) {
      if (!exist) {
        fs.exists(this.cacheFolder, function (folderExist) {
          if (!folderExist) {
            logger.info(`creating data folder: ${this.cacheFolder}`);
            fs.mkdir(this.cacheFolder, 511, function (err) {
              if (err) {
                logger.error('Cache: ', 'failed to create cache folder %j! %j', this.cacheFolder, err);
              }
            });
          }
          callback(false, filename);
        });
      } else {
        fs.stat(filename, function (err, stats) {
          if (err) {
            logger.error('Cache', 'failed to get filestats of file %j with error %j', stats, err);
            throw  err;
          }
          const liveTime = new Date().getTime() - new Date(stats.mtime).getTime();
          logger.info('Cache', 'File %j live Time: %j s.', filename, liveTime / 1000);
          if (liveTime > (this.timeToLive * 1000) && (rYear === currentYear)) {
            logger.info('cache', 'ttl is expired for file %j', filename);
            callback(false, filename);
          } else {
            logger.info('cache', 'taking from cache %j', filename);
            callback(true, filename);
          }
        });
      }
    });
  }
}
