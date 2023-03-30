import NextAuth, { NextAuthOptions, Awaitable, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import api, { setApiJwt } from 'src/core/api/api';

const options: NextAuthOptions = {
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
    async session({ session, token }) {
      return {
        name: session.user?.name,
        email: session.user?.email,
        providerId: token.sub,
      } as unknown as Awaitable<Session>;
    },
    async signIn({ user, account }) {
      //   const { data } = await api({
      //     url: '/auth/login',
      //     method: 'post',
      //     data: {
      //       id: account?.provider,
      //       providerId: account?.providerAccountId,
      //       nickname: user.name?.slice(0, 7),
      //       email: user.email,
      //     },
      //   });
      //   console.log(data.accessToken);
      //   setApiJwt(data.accessToken as string);
      return true;
    },
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default NextAuth(options);
