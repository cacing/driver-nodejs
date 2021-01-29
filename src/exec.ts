export enum ExecType {
  ExecSet = 1,
	ExecGet = 2,
	ExecDel = 3,
	ExecExists = 4,
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
