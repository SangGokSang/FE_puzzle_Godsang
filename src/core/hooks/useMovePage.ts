import { NextRouter } from 'next/router';
import route from 'src/core/const/route.path';

export default function useMovePage(router: NextRouter, pathname: string) {
  const query = {
    originId:
      pathname === route.Key || pathname === route.MyPage || pathname === route.MakeKey
        ? router.query.originId
        : router.query.userId,
  };

  const movePage = (router: NextRouter, pathname: string) => {
    return () => {
      router.push({ pathname, query });
    };
  };
  return movePage;
}
