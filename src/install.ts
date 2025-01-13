declare var self: ServiceWorkerGlobalScope;

export function install({ staticFiles }: { staticFiles: string[] }) {
  return function handleInstall(event: Event) {
    if (!(event instanceof ExtendableEvent)) {
      return;
    }

    self.skipWaiting();

    event.waitUntil(
      (async () => {
        const cache = await caches.open(`v1`);
        await cache.addAll(
          staticFiles.map((url) => {
            return new Request(new URL(url, self.location.origin).href, {
              cache: 'no-cache',
              headers: {
                'Cache-Control': 'max-age=0, no-cache',
              },
            });
          }),
        );
      })(),
    );
  };
}
