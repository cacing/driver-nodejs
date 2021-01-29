import { Signal } from './signal';
import { CommandHeader } from './command_header';

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
  ){
    this.type = type;
    this.user = user;
    this.payload = payload;
    this.headers = headers;
  }

  toMessage(cmd: CommandContract): string {
    return "";
  }

}

export const newCommandFromMessage = (message: string): CommandContract => {
  return new Command(Signal.SignalConnect, "");
};

export default Command;
