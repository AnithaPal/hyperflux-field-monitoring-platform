export interface IUser {
  id: number;
  displayName: string;
  email:	string;
  password:	string;
  securityToken:string;
  securityTokenExpiration:Date;
  team:	ITeam;
  role:	string;
  createdAt:	Date;
  updatedAt: Date;
}

export interface ITeam {
  id:	number;
  name: string;
  users: IUser[];
  createdAt: Date;
  updatedAt: Date;
}





