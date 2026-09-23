import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import { databaseUrl } from "../config/env.js";
const connectionString = databaseUrl;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
//# sourceMappingURL=prisma.js.map