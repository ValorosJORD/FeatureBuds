import { NextFunction, Request, Response } from 'express';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  next();
}
