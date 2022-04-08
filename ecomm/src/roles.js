

const Roles = {
  1: "Admin",
  2: "Client",
  3: "Guest",
};


export default function getRole() {
  return localStorage.getItem("user")
    ? Roles[JSON.parse(localStorage.getItem("user")).role_id]
    : Roles[3];
}
