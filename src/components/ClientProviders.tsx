"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";

// These components use browser-only APIs — must be client-side only
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const PageTransition = dynamic(() => import("@/components/PageTransition"), { ssr: false });

/**
 * Client-side providers wrapper.
 * Bundles all browser-only globals: smooth scroll, cursor, page transitions.
 * Lives in a "use client" boundary so dynamic ssr:false is allowed.
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <PageTransition>
        <CustomCursor />
        {children}
      </PageTransition>
    </SmoothScroll>
  );
}
