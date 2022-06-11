import { defineAbility } from "@casl/ability";
import { getRole } from "./roles.js";

export default defineAbility((can, cannot) => {
  can("manage", "all");
  if (getRole() == "Guest") {
    cannot("create", "all");
    cannot("update", "all");
    cannot("delete", "all");
  }
});
