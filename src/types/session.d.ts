export interface SessionData {
  userId: string;
  userAgent: string | null;
  ipAddress: string | null;
  refreshToken: string;
  expiredAt: Date;
}
