import { CommandHeader } from './command_header';

export enum Signal {
  SignalConnect = 'SIGNAL_CONNECT',
  SignalExec = 'SIGNAL_EXEC',
  SignalSuccess = 'SIGNAL_SUCCESS',
  SignalError = 'SIGNAL_ERROR',
}

interface CommandContract {
  toMessage(cmd: CommandContract): string
}

class Command implements CommandContract {
  type: Signal;
  user: string;
  payload?: string;
  headers?: CommandHeader;

  constructor(
    type: Signal,
    user: string,
    payload?: string,
    headers?: CommandHeader,
  ) {
    this.type = type;
    this.user = user;
    this.payload = payload;
    this.headers = headers;
  }

  toMessage(): string {
    return JSON.stringify({
      t: this.type,
      u: this.user,
      p: this.payload,
      h: this.headers,
    });
  }

  static fromMessage(message: string): Command {
    const msgObj = JSON.parse(message);
    let signal = Signal.SignalError;

    switch (msgObj['t']) {
      case 'SIGNAL_CONNECT':
        signal = Signal.SignalConnect; break;
      case 'SIGNAL_EXEC':
        signal = Signal.SignalExec; break;
      case 'SIGNAL_SUCCESS':
        signal = Signal.SignalSuccess; break;
    }

    return new Command(signal, msgObj['t'], msgObj['p'], msgObj['h']);
  };

}

export default Command;
