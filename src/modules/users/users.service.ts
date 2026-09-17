import type { UserModel as User} from "../../../generated/prisma/models.js";
import { prisma } from '../../lib/prisma.js'
import type { UpdateUserInput } from "./users.schema.js";

type PublicUser = {
    id: number,
    name: string,
    email: string
}

export class UserService {
    getAll = async():Promise<PublicUser[]> => {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    getById = async(id: number):Promise<PublicUser | null> => {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    update = async(id: number, data: UpdateUserInput):Promise<PublicUser> => {
        return prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }

    delete = async(id: number): Promise<User> => {
        return prisma.user.delete({
            where: { id }
        });
    }
}
