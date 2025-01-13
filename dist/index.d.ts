import { ExpressWorker, ExpressWorkerRequest, ExpressWorkerResponse } from "@express-worker/app";
export function useNextArchitecture({ app, staticFiles, routes, PageShell, }: {
    app: ExpressWorker;
    PageShell: React.ComponentType<any>;
    staticFiles: string[];
    routes: Record<string, {
        Component: React.ComponentType<any>;
        getStaticProps: (params: Record<string, string>) => Promise<Record<string, any>>;
        metadata: {
            title: string;
            description?: string;
        };
    }>;
}): void;
interface FormDataWithArrayValue {
    [key: `${string}[]`]: string[] | undefined;
}
interface FormDataWithStringValue {
    [key: string]: string | undefined;
}
export type NormalizedFormData = FormDataWithArrayValue & FormDataWithStringValue;
export interface AdditionalRequestProperties {
    query: Record<string, string>;
    data: NormalizedFormData;
}
export function handleRequest(handler: (req: ExpressWorkerRequest & AdditionalRequestProperties, res: ExpressWorkerResponse) => Promise<void>): (req: ExpressWorkerRequest, res: ExpressWorkerResponse) => Promise<void>;

//# sourceMappingURL=index.d.ts.map
