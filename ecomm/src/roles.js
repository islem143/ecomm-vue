const RolesMap = {
  1: "admin",
  2: "deleveryman",
  3: "client",

};

export const ROLES = {
  ADMIN: "admin",
  DELEVEY_MAN: "deleveryman",
  CLIENT: "client",
  GUEST:"guest"
};

export function getRole() {
  return localStorage.getItem("user")
    ? RolesMap[JSON.parse(localStorage.getItem("user")).role_id]
    : RolesMap[3];
}
