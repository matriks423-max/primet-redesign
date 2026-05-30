"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Reads the sessionStorage key written by public/404.html and
 * navigates to the correct route after hydration.
 * Needed so direct URL access works on GitHub Pages static hosting.
 */
export default function SpaRedirect() {
  const router = useRouter();

  useEffect(() => {
    const dest = sessionStorage.getItem("__spa_redirect");
    if (dest) {
      sessionStorage.removeItem("__spa_redirect");
      if (dest !== "/" && dest !== "") {
        router.replace(dest);
      }
    }
  }, [router]);

  return null;
}
