import { Connection, createConnection } from "mongoose";

interface IConnectionHash {
  [key: string]: Connection;
}

class DBInstance {
  static instance: DBInstance;

  private connectionHash: IConnectionHash;
  private constructor() {
    this.connectionHash = {};
  }

  public static getInstance(): DBInstance {
    if (!DBInstance.instance) {
      DBInstance.instance = new DBInstance();
    }
    return DBInstance.instance;
  }

  public saveDBConnection(key: string, connectionObj: Connection): void {
    this.connectionHash[key] = connectionObj;
  }

  public getDBConnection(key: string): Connection {
    return this.connectionHash[key];
  }

  public closeDBConnection(key): void {
    const dbConnection = this.connectionHash[key];
    dbConnection.close();
  }

  public createDbConnection(connectionData: { uri: string; dbName?: string }) {
    const connectionObj = createConnection(connectionData.uri, {
      ...(connectionData.dbName && { dbName: connectionData.dbName }),
    });
    return connectionObj;
  }
}

export default DBInstance.getInstance();
