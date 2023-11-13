import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { DeseaseDTO } from './desease.dto';

@Injectable()
export class DeseaseService {

    constructor(private prisma: PrismaService) {}

    async create(data: DeseaseDTO){

        const deseaseExists = await this.prisma.desease.findFirst({
            where: {
                name: data.name,
            },
        });

        if (deseaseExists) {
            throw new Error('Esta doença já existe');
        }

        const desease = await this.prisma.desease.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return desease;

    }

    async findAll(){
        return await this.prisma.desease.findMany();
    }

    async update(id: string, data: DeseaseDTO){

        const deseaseExists = await this.prisma.desease.findUnique({
            where: {
                id: id,
            },
        });

        if (!deseaseExists) {
            throw new Error('Doença não encontrada');
        }

        const desease = await this.prisma.desease.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return desease;

    }

    async delete(id: string){

        const deseaseExists = await this.prisma.desease.findUnique({
            where: {
                id: id,
            },
        });

        if (!deseaseExists) {
            throw new Error('Doença não encontrada');
        }

        const desease = await this.prisma.desease.delete({
            where: {
                id: id,
            },
        });
        return desease;

    }

}
