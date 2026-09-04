import type { UserModel as User} from "../../../generated/prisma/models";
import { prisma } from '../../lib/prisma'

export type CreateUserInput = {
    name: string,
    email: string
};

export type UpdateUserInput = {
    name?: string,
    email?: string
}

export class UserService {
    getAll = async():Promise<User[]> => {
        return prisma.user.findMany();
    }

    getById = async(id: number):Promise<User | null> => {
        return prisma.user.findUnique({
            where: { id }
        });
    }

    create = async(data: CreateUserInput): Promise<User> => {
        return prisma.user.create({ data })
    }

    update = async(id: number, data: UpdateUserInput):Promise<User> => {
        return prisma.user.update({
            where: { id },
            data
        });
    }

    delete = async(id: number): Promise<User> => {
        return prisma.user.delete({
            where: { id }
        });
    }
}