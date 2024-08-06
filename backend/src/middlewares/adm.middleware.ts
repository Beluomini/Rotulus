import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AdmMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const admKey = process.env.ADM_KEY;
    if (!req.header('adm-key') || req.header('adm-key') !== admKey) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}
