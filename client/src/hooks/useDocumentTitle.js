import { useEffect } from "react";

const SITE_NAME = "HammerTime";

/**
 * Sets the document title for the current page.
 * Appends the site name: "Page Title | HammerTime"
 * Resets to default on unmount.
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    return () => {
      document.title = prev;
    };
  }, [title]);
};
