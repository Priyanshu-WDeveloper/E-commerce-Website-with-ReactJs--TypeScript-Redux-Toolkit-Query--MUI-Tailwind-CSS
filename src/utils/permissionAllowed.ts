// import secureLocalStorage from "react-secure-storage";
import { permissionsEnum } from "../constants/permission";
import { ADMIN_ROLE_ID } from "../constants/role";
import { RolePermission } from "../types/useAuth";

export const isEditAllowed = (permissionNumber: number) => {
  return true;
  const role = secureLocalStorage?.getItem("role");
  const permissions = secureLocalStorage?.getItem("permissions");

  if (role == ADMIN_ROLE_ID) {
    return true; // Admins can access the page
  }

  if (permissions && permissions !== "undefined") {
    let parsedPermissions;
    try {
      parsedPermissions = JSON.parse(permissions as string);
    } catch (error) {
      console.error("Failed to parse permissions:", error);
      return false;
    }

    const hasViewPermission = parsedPermissions.some(
      (data2: RolePermission) =>
        data2?.module === permissionsEnum[permissionNumber] &&
        data2?.can_add_edit
    );

    if (!hasViewPermission) {
      return false;
    }
  } else {
    return false;
  }

  return true;
};
export const isDeleteAllowed = (permissionNumber: number) => {
  return true;
  const role = secureLocalStorage?.getItem("role");
  const permissions = secureLocalStorage?.getItem("permissions");

  if (role == ADMIN_ROLE_ID) {
    return true; // Admins can access the page
  }

  if (permissions && permissions !== "undefined") {
    let parsedPermissions;
    try {
      parsedPermissions = JSON.parse(permissions as string);
    } catch (error) {
      console.error("Failed to parse permissions:", error);
      return false;
    }

    const hasViewPermission = parsedPermissions.some(
      (data2: RolePermission) =>
        data2?.module === permissionsEnum[permissionNumber] &&
        data2?.can_be_delete
    );

    if (!hasViewPermission) {
      return false;
    }
  } else {
    return false;
  }

  return true;
};
export const isViewAllowed = (permissionNumber: number) => {
  const role = secureLocalStorage?.getItem("role");
  const permissions = secureLocalStorage?.getItem("permissions");

  if (role == ADMIN_ROLE_ID) {
    return true; // Admins can access the page
  }

  if (permissions && permissions !== "undefined") {
    let parsedPermissions;
    try {
      parsedPermissions = JSON.parse(permissions as string);
    } catch (error) {
      console.error("Failed to parse permissions:", error);
      return false;
    }

    const hasViewPermission = parsedPermissions.some(
      (data2: RolePermission) =>
        data2?.module === permissionsEnum[permissionNumber] && data2?.can_view
    );

    if (!hasViewPermission) {
      return false;
    }
  } else {
    return false;
  }

  return true;
};
