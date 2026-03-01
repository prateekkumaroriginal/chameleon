import { useState, useEffect } from "react";

export function useCurrentDomain(): { domain: string; loading: boolean } {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDomain() {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (tab?.url) {
          const url = new URL(tab.url);
          setDomain(url.hostname);
        }
      } catch {
        setDomain("");
      } finally {
        setLoading(false);
      }
    }
    fetchDomain();
  }, []);

  return { domain, loading };
}
