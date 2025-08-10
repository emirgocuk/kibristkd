import React, { useEffect, useState } from 'react';
import http, { unwrap } from '../api/http';

export default function GlobalContent() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await unwrap(http.get('/api/settings/content'));
        if (mounted) setContent(data);
      } catch {
        // sessizce geç; stub yoksa bile sayfa çökmemeli
        if (mounted) setContent(null);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Bu komponent global metin/banner gibi şeyleri yüklemek için kullanılacak.
  // Şimdilik görünür bir şey render etmiyoruz.
  return null;
}
