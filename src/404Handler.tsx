import {
  ExpressWorker,
  ExpressWorkerRequest,
  ExpressWorkerResponse,
} from '@express-worker/app';
import { renderToString } from 'react-dom/server';

export default function use404Handler(
  app: ExpressWorker,
  config: {
    PageShell: React.ComponentType<any>;
    Component?: React.ComponentType<any>;
    metadata?: {
      title: string;
      description?: string;
    };
  },
) {
  app.get(
    '*',
    async (req: ExpressWorkerRequest, res: ExpressWorkerResponse) => {
      res.status(404);

      if (config.Component) {
        const renderResult = renderToString(
          <config.PageShell
            {...config.metadata}
            initialData={{}}
          >
            <config.Component />
          </config.PageShell>,
        );
        res.send(renderResult);
      } else {
        res.send('Not found.');
      }
    },
  );
}
