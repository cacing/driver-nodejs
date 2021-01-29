export enum ExecType {
  ExecSet = 'SET',
	ExecGet = 'GET',
	ExecDel = 'DEL',
	ExecExists = 'EXISTS',
}

interface ExecContract {

}

class Exec {
	type: ExecType;
	args: string[];

	constructor(
		type: ExecType,
		args: string[],
	){
		this.type = type;
		this.args = args;
	}
}

export const createExecFromCommandPayload = (payload: string): ExecContract => {
	return new Exec(ExecType.ExecExists, ["u"]);
} 

export default Exec;
