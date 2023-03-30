import NextAuth, { Awaitable, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import api, { setApiJwt } from 'src/core/api/api';
import { getAccessToken, setAccessToken } from 'src/core/api/auth';

// eslint-disable-next-line import/no-anonymous-default-export
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID as string,
      clientSecret: process.env.NAVER_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token }) {
      return {
        user: {
          accessToken: token?.accessToken,
        },
      } as unknown as Awaitable<Session>;
    },
    // async signIn({ user, account }) {
    //   const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    //   const res = await fetch(`${baseUrl}/auth/login`, {
    //     method: 'post',
    //     body: JSON.stringify({
    //       id: account?.provider,
    //       providerId: account?.providerAccountId,
    //       nickname: user.name?.slice(0, 7),
    //       email: user.email,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .catch((err) => console.log('err', err));
    //   setAccessToken(res);
    //   // console.log(res);
    //   return true;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'post',
        body: JSON.stringify({
          id: account?.provider,
          providerId: account?.providerAccountId,
          nickname: user?.name?.slice(0, 7),
          email: user?.email,
        }),
      })
        .then((response) => response.json())
        .catch((err) => console.log('err', err));
      return { ...token, accessToken: res };
    },
  },
});