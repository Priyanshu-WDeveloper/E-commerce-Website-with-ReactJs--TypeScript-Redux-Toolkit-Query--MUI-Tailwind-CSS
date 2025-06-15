export interface UseAuth {
  id: number;
  email: string;
  name: string;
  phone_no: string;
  country_code: string;
  profile_picture: ProfilePicture;
  role: number;
  role_permission: RolePermission[];
}

interface ProfilePicture {
  id: number;
  media_url: string;
  media_type: string;
  media_name: string;
  media_size: string;
}

export interface RolePermission {
  id: number;
  module: string;
  can_add_edit: boolean;
  can_view: boolean;
  can_be_delete: boolean;
}
