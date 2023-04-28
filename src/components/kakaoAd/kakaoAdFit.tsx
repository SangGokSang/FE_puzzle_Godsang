import { SerializedStyles } from '@emotion/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import route from 'src/core/const/route.path';

function KakaoAdFit({ css }: { css?: SerializedStyles }) {
  const adRef = useRef<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (adRef.current) {
      return;
    }

    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'none;';

    if (router.pathname === route.MakeKey) {
      ins.setAttribute('data-ad-width', '320');
      ins.setAttribute('data-ad-height', '250');
      ins.setAttribute('data-ad-unit', 'DAN-MYaane3AJr8IY2V8');
    } else {
      ins.setAttribute('data-ad-width', '320');
      ins.setAttribute('data-ad-height', '50');
      ins.setAttribute('data-ad-unit', 'DAN-gIcfkVuCtxNiuuKh');
    }

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    document.querySelector('.aside__kakaoAdFit')?.appendChild(ins);
    document.querySelector('.aside__kakaoAdFit')?.appendChild(script);

    // 광고 로딩 여부 상태 변경
    adRef.current = true;
  }, [router.pathname]);

  return <aside css={css} className="aside__kakaoAdFit"></aside>;
}

export default React.memo(KakaoAdFit);
