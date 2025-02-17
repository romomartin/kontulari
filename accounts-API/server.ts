import { api } from "./src/api";

export const server = api.listen(3000, () => "API listening on port 3000");
