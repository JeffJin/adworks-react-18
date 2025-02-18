import { NextRequest } from 'next/server';

export function isAuthenticated(req: NextRequest): boolean {
  if (req.cookies.has('authToken')) {
    return true;
  }
  return false;
}
