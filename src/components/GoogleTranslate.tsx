import React, { useEffect } from 'react';

interface WindowWithGoogleTranslate extends Window {
  googleTranslateElementInit?: () => void;
  google?: {
    translate?: {
      TranslateElement?: new (
        param: { pageLanguage: string },
        elementId: string
      ) => void;
    };
  };
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    const googleTranslateElementInit = () => {
      const googleTranslate = (window as WindowWithGoogleTranslate).google
        ?.translate;
      if (googleTranslate && googleTranslate.TranslateElement) {
        new googleTranslate.TranslateElement(
          { pageLanguage: 'en' },
          'google_translate_element'
        );
      } else {
        console.error('TranslateElement is not available');
      }
    };

    if ((window as WindowWithGoogleTranslate).googleTranslateElementInit) {
      googleTranslateElementInit();
    } else {
      (window as WindowWithGoogleTranslate).googleTranslateElementInit =
        googleTranslateElementInit;
    }

    addGoogleTranslateScript();
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
