import {
  ExpressWorker,
  ExpressWorkerRequest,
  ExpressWorkerResponse,
} from '@express-worker/app';
import { renderToString } from 'react-dom/server';

function convertPath(path: string) {
  return path.replace(/\[([^\]]+)\]/g, ':$1');
}

export default function useAppRouter(
  app: ExpressWorker,
  config: {
    routes: Record<string, any>;
    PageShell: React.ComponentType<any>;
  },
) {
  for (const [path, { Component, getStaticProps, metadata }] of Object.entries<{
    Component: React.ComponentType<any>;
    getStaticProps?: (
      params: Record<string, string>,
    ) => Promise<Record<string, any>>;
    metadata?: {
      title: string;
      description?: string;
    };
  }>(config.routes)) {
    app.get(
      convertPath(path),
      async (req: ExpressWorkerRequest, res: ExpressWorkerResponse) => {
        try {
          const initialProps = getStaticProps
            ? await getStaticProps(req.params)
            : {};

          const renderResult = renderToString(
            <config.PageShell
              {...(metadata || {})}
              initialData={initialProps}
            >
              <Component {...initialProps} />
            </config.PageShell>,
          );

          res.send(renderResult);
        } catch (error) {
          res.status(404).send('Not found');
        }
      },
    );
  }
}
