import "reflect-metadata";
import PostgreSqlConnector from "./database/connectors/PostgreSqlConnector";
import { IDatabaseConnector } from "./Interface/index";
/**
 * @class App
 */
class App {
  dbConnector?: IDatabaseConnector;

  protected async setupDependencies(): Promise<void> {
    this.dbConnector = new PostgreSqlConnector();
    await this.dbConnector.connect();
  }

  checkDependencies(): void {
    if (!PostgreSqlConnector.getClient()) {
      throw new Error("Initialize DB!!!");
    }
  }

  close() {
    this.dbConnector?.disconnect();
  }
}

export default App;
