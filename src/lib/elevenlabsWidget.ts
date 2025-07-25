import { useEffect } from 'react';

declare global {
  interface Window {
    next?: {
      router?: {
        push: (path: string) => void;
      };
    };
  }
}

function updateWidgetVariant(widget: HTMLElement) {
  const isMobile = window.innerWidth <= 640;
  widget.setAttribute('variant', isMobile ? 'expandable' : 'compact');
}

function updateWidgetColors(widget: HTMLElement) {
  const isDark = !document.documentElement.classList.contains('light');
  widget.setAttribute('avatar-orb-color-1', isDark ? '#2E2E2E' : '#4D9CFF');
  widget.setAttribute('avatar-orb-color-2', isDark ? '#B8B8B8' : '#9CE6E6');
}

function updateBottomOffset(widget: HTMLElement) {
  const basePadding = 20;
  const nav = document.getElementById('bottom-nav');
  const navHeight = nav?.offsetHeight || 0;
  widget.style.bottom = `${navHeight + basePadding}px`;
  widget.style.transition = 'bottom 0.3s ease';
}

const ELEVENLABS_ID =
  'elevenlabs-convai-widget-60993087-3f3e-482d-9570-cc373770addc';
const SCRIPT_ID = 'elevenlabs-widget-script';

export const ElevenLabsWidget = () => {
  useEffect(() => {
    const existingWidget = document.getElementById(ELEVENLABS_ID);
    const existingScript = document.getElementById(SCRIPT_ID);

    // Prevent multiple widget/script injections
    if (existingWidget || existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    script.id = SCRIPT_ID;

    script.onload = () => {
      const wrapper = document.createElement('div');
      wrapper.className = 'desktop';

      const widget = document.createElement('elevenlabs-convai');
      widget.id = ELEVENLABS_ID;
      widget.setAttribute('agent-id', 'agent_01jy4gwf2wemqr4qqp2jay5t4q');
      widget.setAttribute('variant', 'compact');
      widget.setAttribute(
        'avatar-image-url',
        'https://ovexmcodlyhefuhmdfez.supabase.co/storage/v1/object/public/topics-images//ChatGPT-rosie.png'
      );
      widget.style.position = 'fixed';

      // Set initial styles
      updateWidgetColors(widget);
      updateWidgetVariant(widget);
      updateBottomOffset(widget);

      // Observe theme changes
      const themeObserver = new MutationObserver(() => {
        updateWidgetColors(widget);
      });

      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });

      // Handle window resize
      const handleResize = () => updateWidgetVariant(widget);
      window.addEventListener('resize', handleResize);

      // Handle bottom nav resize
      const nav = document.getElementById('bottom-nav');
      const resizeObserver = new ResizeObserver(() =>
        updateBottomOffset(widget)
      );
      if (nav) resizeObserver.observe(nav);

      // Listen to widget "call" event
      widget.addEventListener('elevenlabs-convai:call', (e) => {
        const event = e as CustomEvent;
        event.detail.config.clientTools = {
          redirectToDocs: ({ path }) => {
            const router = window?.next?.router;
            router?.push(path);
          },
          redirectToEmailSupport: ({ subject, body }) => {
            window.open(
              `mailto:team@elevenlabs.io?subject=${encodeURIComponent(
                subject
              )}&body=${encodeURIComponent(body)}`,
              '_blank'
            );
          },
          redirectToSupportForm: ({ subject, description, extraInfo }) => {
            const url = `https://help.elevenlabs.io/hc/en-us/requests/new?ticket_form_id=13145996177937&tf_subject=${encodeURIComponent(
              subject
            )}&tf_description=${encodeURIComponent(
              description
            )}%3Cbr%3E%3Cbr%3E${encodeURIComponent(extraInfo)}`;
            window.open(url, '_blank');
          },
          redirectToExternalURL: ({ url }) => {
            window.open(url, '_blank');
          },
        };
      });

      wrapper.appendChild(widget);
      document.body.appendChild(wrapper);

      // Cleanup
      return () => {
        themeObserver.disconnect();
        window.removeEventListener('resize', handleResize);
        resizeObserver.disconnect();
        widget.remove();
        wrapper.remove();
      };
    };

    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget script.');
    };

    document.head.appendChild(script);
  }, []);

  return null;
};
