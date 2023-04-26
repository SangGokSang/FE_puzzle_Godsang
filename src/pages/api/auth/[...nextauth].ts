import NextAuth, { Awaitable, Session } from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
  providers: [
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
    // async signIn({ user, account, profile, email, credentials }) {
    //   // console.log('user', user, 'account', account, 'profile', profile);
    //   const payload = {
    //     nickname: user.name?.slice(0, 7),
    //     email: user.email,
    //     provider: account?.provider,
    //     providerId: account?.providerAccountId,
    //   };
    //   console.log(payload);
    //   const data = await fetch('https://dearmy2023.click/api/user/login', {
    //     method: 'POST',
    //     body: JSON.stringify(payload),
    //   }).then((res) => res.json());
    //   console.log('afterData', data);
    //   return true;
    // },
    // async jwt({ token, user, account }) {
    //   const d = {
    //     provider: account?.provider,
    //     providerId: account?.providerAccountId,
    //     nickname: user?.name,
    //     email: user?.email,
    //   };
    //   return { ...d, ...token };
    // },
    async session({ token, session }) {
      return {
        user: {
          ...session.user,
          providerId: token.sub,
        },
      } as unknown as Awaitable<Session>;
    },
  },
});
