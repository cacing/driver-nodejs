export enum ExecType {
  ExecSet = 'EXEC_SET',
	ExecGet = 'EXEC_GET',
	ExecDel = 'EXEC_DEL',
	ExecExists = 'EXEC_EXISTS',
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
