/**
 * Represents a user from the API
 */
interface User {
  _id: string;
  roles: object;
  // role: number;
  email: string;
  isPhoneVerified: boolean;
  firstName: string;
  lastName: string;
  username?: string;
  countryCode: string;
  phone: string;
  image: string;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
  token: string;
  tokenType: string;
}
export interface NewUserResponse {
  _id: number;
  roles: object;
  // roles:{
  //   Admin:number
  //   Editor:number
  //   User:number
  // }
  username: string;
  email?: string;
  image: string;
  firstName?: string;
  lastName?: string;
  name?: {
    first: string;
    last: string;
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  phone?: string;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}
interface UserResponse {
  _id: id;
  phone?: string;
  username?: string;
  email?: string;
  updatedAt: Date;
  createdAt: Date;
}

/**
 * Response structure from the users API
 */
export interface CommonUserResponseType {
  data: UserResponse[];
  message: string;
  statusCode: number;
  success: boolean;
  // total: number;
  // skip: number;
  // limit: number;
}
// export interface CommonResponseType {
//   data: {
//     accessToken: string;
//     user: UserResponse[];
//   };
//   message: string;
//   statusCode: number;
//   success: boolean;
//   // total: number;
//   // skip: number;
//   // limit: number;
// }
// export interface CommonResponseType {
//   users: UserResponse[];
//   total: number;
//   skip: number;
//   limit: number;
// }
