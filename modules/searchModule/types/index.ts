export enum Gender{
  Male,
  Female,
  NonBinary
}

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender
}

export interface SearchParamsType {
  firstName: string;
  lastName?: string;
}

export interface  ListProps {
  listData: UserType[];
  onCellClick: (val: string) => void;
}


export interface IfProps {
  condition: any;
  children: any;
}


export interface ValueTrackerType {
  preText: string;
  userName: string;
}