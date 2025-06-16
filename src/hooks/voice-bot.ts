import { useEffect } from 'react';

// A hook that loads the ElevenLabs Convai script
export function useElevenLabsBot(agentId: string) {
  useEffect(() => {
    // Check if the script already exists to avoid duplicates
    if (
      !document.querySelector(
        `script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]`
      )
    ) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }, [agentId]); // run this when the agentId changes
}
