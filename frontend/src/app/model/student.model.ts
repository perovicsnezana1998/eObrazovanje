export class Student implements StudentInterface{
	public id: number;
	public cardNumber: string;
	public firstName: string;
	public lastName: string;
		
	constructor(studentCfg:StudentInterface)
	{	
		this.id = studentCfg.id;
		this.cardNumber = studentCfg.cardNumber;
		this.firstName = studentCfg.firstName;
		this.lastName = studentCfg.lastName;		
	}
}

interface StudentInterface{
	id?: number;
	cardNumber: string;
	firstName: string;	
	lastName: string;
}