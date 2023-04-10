import { DB } from "../config";
import { DataSource } from "typeorm";
import { IDatabaseConnector } from "../../Interface";

/**
 * @class PostgreSqlConnector
 */
export default class PostgreSqlConnector implements IDatabaseConnector {

  protected static client: DataSource;

  /**
   * @name getClient
   * @static
   * @memberof PostgreSqlConnector
   * @returns {*}
   */
  static getClient() {
    return this.client;
  }

  /**
   * @instance
   * @name connect
   * @param url
   * @memberof PostgreSqlConnector
   * @desc connects to postgreSql database
   */
  async connect() {
    PostgreSqlConnector.client = await DB.initialize();
  }

  /**
   * @instance
   * @name disconnect
   * @memberof PostgreSqlConnector
   * @desc disconnects from postgreSql database
   */
  async disconnect() {
    await PostgreSqlConnector.client?.destroy();
  }

}