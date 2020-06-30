export class Course implements CourseInterface{
	public id: number;
	public name: string;
		
	constructor(courseCfg: CourseInterface)
	{	
		this.id = courseCfg.id;
		this.name = courseCfg.name;
	}
}

interface CourseInterface {
	id?: number;
	name: string;
}