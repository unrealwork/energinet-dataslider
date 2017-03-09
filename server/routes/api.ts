'use strict';

import {Router, Response, Request} from 'express';
import {Cacher} from '../helpers/cacher';
import * as fs from 'fs';
import {getConfig} from '../helpers/file-helper';

const apiRouter = Router();
const Series = require('atsd-api').Series;
const logger = require('npmlog');
const api = Router();
const config = getConfig();
const series = new Series(config.atsdOptions);
const cache = new Cacher(config.cacheOptions);

apiRouter.post('/series', (req: Request, res: Response) => {
  cache.cache(req, (cached: boolean, cachePath: string) => {
    if (cached) {
      fs.readFile(cachePath, function (err, data) {
        if (err) {
          logger.log('Cache error', 'Failed to read cache data. Thrown error: %j', err);
          res.sendStatus(500);
        } else {
          res.json(JSON.parse(data.toString()));
        }
      });
    } else {
      series.query(req.body, function (error, response, data) {
        if (error) {
          logger.error(error);
          res.sendStatus(400);
        } else {
          fs.writeFile(cachePath, JSON.stringify(data), function (err) {
            if (err) {
              logger.error('Cache :', 'Failed to write cache data %j on path %j. Thrown error %j',
                data,
                cachePath,
                err
              );
            }
            res.json(data);
          });
        }
      });
    }
  });
});

export {apiRouter};
