import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AdditiveDTO } from './additive.dto';

@Injectable()
export class AdditiveService {

    constructor(private prisma: PrismaService) { }

    
    async create(data: AdditiveDTO){

        const additiveExists = await this.prisma.additive.findFirst({
            where: {
                name: data.name,
            },
        });

        if (additiveExists) {
            throw new Error('Este aditivo já está cadastrado');
        }

        const additive = await this.prisma.additive.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return additive;
            
    }

    async findAll() {
        return await this.prisma.additive.findMany();
    }

    async findOne(id: string) {
        const additive = await this.prisma.additive.findFirst({
            where: {
                id: id,
            },
            include: {
                foods: {
                    include: {
                        food: true,
                    },
                },
            },
        });
        return additive;
    }

    async findManyByName(name: string) {
        const additives = await this.prisma.additive.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });
        return additives;
    }

    async update(id: string, data: AdditiveDTO){
        const additiveExists = await this.prisma.additive.findUnique({
            where: {
                id: id,
            },
        });

        if (!additiveExists) {
            throw new Error('Aditivo não encontrado');
        }

        const additive = await this.prisma.additive.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return additive;
    }

    async delete(id: string) {
        const additiveExists = await this.prisma.additive.findUnique({
            where: {
                id: id,
            },
        });

        if (!additiveExists) {
            throw new Error('Aditivo não encontrado');
        }

        const additive = await this.prisma.additive.delete({
            where: {
                id: id,
            },
        });
        return additive;
    }

}
