export interface User {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate?: Date;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

export interface UserPatchDto {
  id: string,
  name: string,
  surName: string,
  fullName: string,
  birthDate?: Date,
  telephone?: string,
  employment?: string,
  userAgreement?: boolean,
}
export interface UserCreateDto {
  name: string,
  surName: string,
  password: string,
  fullName: string,
  email: string,
  birthDate?: Date,
  telephone?: string,
  employment?: string,
  userAgreement?: boolean,
}
