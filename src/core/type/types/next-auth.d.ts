// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      providerId: string;
      email: string;
      name: string;
      // nickname?: string;
      // birthdate?: number;
      // isWithdrawUser?: boolean;
      // userId?: number;
    };
  }
}
