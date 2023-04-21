import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const AdForKey = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="googleAd-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', overflow: 'hidden', height: '100px' }}
        data-ad-slot="9673409455"
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-client={process.env.GOOGLE_ADSENSE_ID}
      />
    </div>
  );
};

export default AdForKey;
