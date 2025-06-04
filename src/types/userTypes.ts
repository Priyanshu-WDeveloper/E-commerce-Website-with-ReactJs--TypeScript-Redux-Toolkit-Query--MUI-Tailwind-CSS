/**
 * Represents a user from the API
 */
export interface User {
  id: number;
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

/**
 * Response structure from the users API
 */
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}