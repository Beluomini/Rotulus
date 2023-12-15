import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FoodDTO } from './food.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FoodService {

    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.FoodCreateInput){

        const foodExists = await this.prisma.food.findUnique({
            where: {
                barcode: data.barcode,
            },
        });

        if (foodExists) {
            throw new Error('Este código de barras já está sendo usado');
        }

        // transforma o nome da classificação caixa baixa com a primeira letra da primeira palavra maiúscula
        data.name = data.name.charAt(0).toUpperCase()+data.name.slice(1).toLowerCase();
        data.brandName = data.brandName.charAt(0).toUpperCase()+data.brandName.slice(1).toLowerCase();


        const food = await this.prisma.food.create({
            data: {
                name: data.name,
                barcode: data.barcode,
                description: data.description,
                image: data.image,
                brandName: data.brandName,
                servingSize: data.servingSize,
                energyValue: data.energyValue,
                carbohydrate: data.carbohydrate,
                totalSugar: data.totalSugar,
                addedSugar: data.addedSugar,
                protein: data.protein,
                totalFat: data.totalFat,
                saturatedFat: data.saturatedFat,
                transFat: data.transFat,
                fiber: data.fiber,
                sodium: data.sodium,
                classification: data.classification,
                ingredients: {
                    create: data.ingredients.create,
                },
                additives: {
                    create: data.additives.create,
                },
            },
        });
        return food;
    }

    async findAll() {
        return await this.prisma.food.findMany(
            {
                include: {
                    ingredients: {
                        include: {
                            ingredient: true,
                        },
                    },
                    additives: {
                        include: {
                            additive: true,
                        },
                    },
                },
            }
        );
    }

    async findOne(id: string) {

        const food = await this.prisma.food.findFirst({
            where: {
                id: id,
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                additives: {
                    include: {
                        additive: true,
                    },
                },
            },
        });

        if (!food) {
            throw new Error('Alimento não encontrado');
        }

        return food;
    }

    async findByBarcode(barcode: string) {
            
        const food = await this.prisma.food.findFirst({
            where: {
                barcode: barcode,
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                additives: {
                    include: {
                        additive: true,
                    },
                },
            },
        });

        if (!food) {
            throw new Error('Alimento não encontrado');
        }

        return food;
    }

    async findManyByName(name: string) {
        const foods = await this.prisma.food.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                additives: {
                    include: {
                        additive: true,
                    },
                },
            },
        });
        return foods;
    }

    async update(id: string, data: Prisma.FoodUpdateInput){
        const foodExists = await this.prisma.food.findUnique({
            where: {
                id: id,
            },
        });

        if (!foodExists) {
            throw new Error('Alimento não encontrado');
        }

        const food = await this.prisma.food.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                barcode: data.barcode,
                description: data.description,
                image: data.image,
                brandName: data.brandName,
                servingSize: data.servingSize,
                energyValue: data.energyValue,
                carbohydrate: data.carbohydrate,
                totalSugar: data.totalSugar,
                addedSugar: data.addedSugar,
                protein: data.protein,
                totalFat: data.totalFat,
                saturatedFat: data.saturatedFat,
                transFat: data.transFat,
                fiber: data.fiber,
                sodium: data.sodium,
                classification: data.classification,
                ingredients: {
                    create: data.ingredients.create,
                },
                additives: {
                    create: data.additives.create,
                },
            },
        });
        return food;
    }

    async delete(id: string) {
        const foodExists = await this.prisma.food.findFirst({
            where: {
                id: id,
            },
        });

        if (!foodExists) {
            throw new Error('Alimento não encontrado');
        }

        const food = await this.prisma.food.delete({
            where: {
                id: id,
            },
        });
        return food;
    }

}
