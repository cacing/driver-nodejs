import { Socket } from 'net';
import PromiseSocket from "promise-socket"

import Command, { Signal } from './command';

export class Client {
  url: URL;
  socket: PromiseSocket<Socket>;

  constructor(url: URL, socket: PromiseSocket<Socket>) {
    this.url = url;
    this.socket = socket;
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

  const cmdConnect = new Command(Signal.SignalConnect, `${url.username} ${url.password}`);
  await socketPromised.write(cmdConnect.toMessage() + '\n');
  
  const client = new Client(url, socketPromised);
  return client;
}

export default Client;
