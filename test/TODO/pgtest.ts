declare module "pgtest" {
  interface PgServer {
    getConnectionString(): string;
    stop(): Promise<void>;
  }

  interface PgTestOptions {
    pg: {
      version: string;
      dataDir?: string;
    };
  }

  export function init(options: PgTestOptions): Promise<PgServer>;
}
