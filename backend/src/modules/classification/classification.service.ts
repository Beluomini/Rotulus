import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ClassificationDTO } from './classification.dto';

@Injectable()
export class ClassificationService {

    constructor(private prisma: PrismaService) {}

    async create(data: ClassificationDTO) {

        const classificationExists = await this.prisma.classification.findFirst({
            where: {
                name: data.name.toLowerCase(),
            }
        });

        if (classificationExists) {
            throw new Error('Esta classificação já existe');
        }

        // transforma o nome da classificação caixa baixa com a primeira letra da primeira palavra maiúscula
        data.name = data.name.charAt(0).toUpperCase()+data.name.slice(1).toLowerCase();

        const classification = await this.prisma.classification.create({
            data: {
                name: data.name,
                description: data.description,
            }
        });
        return classification;
    }

    async findAll() {
        return await this.prisma.classification.findMany();
    }

    async findOne(id: string) {
        const classification = await this.prisma.classification.findUnique({
            where: {
                id: id,
            }
        });
        return classification;
    }

    async findManyByName(name: string) {
        const classifications = await this.prisma.classification.findMany({
            where: {
                name: {
                    contains: name,
                }
            }
        });
        return classifications;
    }

    async update(id: string, data: ClassificationDTO) {
            
            const classificationExists = await this.prisma.classification.findUnique({
                where: {
                    id: id,
                }
            });
    
            if (!classificationExists) {
                throw new Error('Classificação não encontrada');
            }
    
            const classification = await this.prisma.classification.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name === undefined ? classificationExists.name : data.name.toLowerCase(),
                    description: data.description,
                }
            });
            return classification;
        }

    async delete(id: string) {
        const classificationExists = await this.prisma.classification.findUnique({
            where: {
                id: id,
            }
        });
        
        if (!classificationExists) {
            throw new Error('Classificação não encontrada');
        }

        const foodExists = await this.prisma.food.findFirst({
            where: {
                classificationId: id,
            }
        });

        if (foodExists) {
            throw new Error('Esta classificação não pode ser excluída, pois está sendo usada por um alimento');
        }

        const classification = await this.prisma.classification.delete({
            where: {
                id: id,
            }
        });
        return classification;
    }

}
