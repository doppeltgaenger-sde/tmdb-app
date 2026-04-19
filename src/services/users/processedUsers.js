import { users } from "@data";
import { getUserColor } from "@utils";

export const processedUsers = users.map(user => ({
  ...user,
  color: getUserColor(user.id) 
}));
