import { Socket } from 'net';
import PromiseSocket from "promise-socket"

import Command, { Signal } from './command';
import { ExecType } from './exec';

export class Client {
  url: URL;
  socket: PromiseSocket<Socket>;
  id?: string;

  constructor(url: URL, socket: PromiseSocket<Socket>) {
    this.url = url;
    this.socket = socket;
  }

  async set(key: string, value: string) {
    const cmdExec = new Command(Signal.SignalExec, this.id || '', `SET ${key} ${value}`);
    await this.socket.write(cmdExec.toMessage() + '\n');
    const result = (await this.socket.read())?.toString();
    const cmdResult = Command.fromMessage(result);

    if (cmdResult?.type == Signal.SignalSuccess && cmdResult?.payload == ExecType.ExecSet) {
      return true;
    }

    return false;
  }

  async get(key: string): Promise<string> {
    const cmdExec = new Command(Signal.SignalExec, this.id || '', `GET ${key}`);
    await this.socket.write(cmdExec.toMessage() + '\n');
    const result = (await this.socket.read())?.toString();
    const cmdResult = Command.fromMessage(result);

    if (cmdResult?.type == Signal.SignalSuccess) {
      return cmdResult?.payload || '';
    }

    throw Error(cmdResult?.payload);
  }

  disconnect() {
    this.socket.destroy();
  }

}

export const connect = async (dsn: string): Promise<Client> => {
  const url = new URL(dsn);
  const socket = new Socket();
  const socketPromised = new PromiseSocket(socket);

  await socketPromised.connect({
    host: url.hostname,
    port: parseInt(url.port),
  });

  const client = new Client(url, socketPromised);

  const cmdConnect = new Command(Signal.SignalConnect, `${url.username} ${url.password}`);
  await socketPromised.write(cmdConnect.toMessage() + '\n');
  const connectResult = await socketPromised.read();
  const cmdConnectResult = Command.fromMessage(connectResult?.toString());

  if (cmdConnectResult?.type == Signal.SignalSuccess && cmdConnectResult?.payload == 'login') {
    client.id = cmdConnectResult.user;
  }
  return client;
}

export default Client;
