import { User } from 'src/recoil/auth/type';
import { useRouter } from 'next/router';
import route from 'src/core/const/route.path';
import auth from 'src/recoil/auth';
import { authDefaultValue } from 'src/recoil/auth/atom';
import { useSyncRecoil } from './useSyncRecoil';

export default function useMovePage(pathname: string, currentPage?: string) {
  const router = useRouter();
  const { userId } = useSyncRecoil<User>({ atom: auth, defaultValue: authDefaultValue });
  const paramsId = router.query.userId as string;
  const originId = router.query.originId as string;

  const getQuery = () => {
    if (!userId || !currentPage) {
      return;
    }
    if (currentPage === route.Key || currentPage === route.MyPage || currentPage === route.MakeKey) {
      return pathname === route.List ? { userId: originId } : { originId: originId };
    }
    return pathname === currentPage ? { userId: paramsId } : { originId: paramsId };
  };

  const movePage = () => {
    const query = getQuery();

    if (!query) {
      router.push(!userId ? route.Landing : currentPage === route.HowToUse ? route.Landing : pathname);
      return;
    }

    if (currentPage === route.HowToUse && userId) {
      if (pathname === route.List) {
        router.back();
      } else {
        router.push({ pathname, query: { originId: userId.toString() } });
      }
      return;
    }

    router.push({ pathname, query });
  };

  return movePage;
}
