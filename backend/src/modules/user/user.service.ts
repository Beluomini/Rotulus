import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async create(data: UserDTO){

        const userExists = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (userExists) {
            throw new Error('Este email já está sendo usado');
        }

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                passwordRec: data.passwordRec,
                status: data.status,
            },
        });
        return user;
    }

    async findAll(){
        return await this.prisma.user.findMany();
    }

    async update(id: string, data: UserDTO){

        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!userExists) {
            throw new Error('Usuário não encontrado');
        }

        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                passwordRec: data.passwordRec,
                status: data.status,
            },
        });
        return user;
    }

    async delete(id: string){
        const userExists = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!userExists) {
            throw new Error('Usuário não encontrado');
        }

        const user = await this.prisma.user.delete({
            where: {
                id: id,
            },
        });
        return user;
    }
}
