import { Helmet } from "react-helmet-async";

const ADSENSE_CLIENT = "ca-pub-1786038180355021";

const GoogleAdSenseHead = () => {
  return (
    <Helmet prioritizeSeoTags>
      <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
    </Helmet>
  );
};

export default GoogleAdSenseHead;