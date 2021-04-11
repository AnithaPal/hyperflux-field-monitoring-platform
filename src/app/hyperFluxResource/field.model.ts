export interface IField {
  id: number;
  team: number;
  name: string;
  connections: number;
  fluxStateWarning: boolean;
  encRate: number;
  vSpaceUsage: number;
  vSpaceLimit: number;
  gfaBandwidthUsage: number;
  gfaBandwidthLimit: number;
  relays: IRelay[];
  createdAt: Date;
  updatedAt: Date;

}

export interface IRelay {
  id:	number;
  state:	string;
  strength:	number;
  field: IField;
  createdAt: Date;
  updatedAt:	Date;
}


