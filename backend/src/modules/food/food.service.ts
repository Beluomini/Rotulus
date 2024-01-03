import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FoodDTO } from './food.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FoodService {

    constructor(private prisma: PrismaService) {}

    async create(data: FoodDTO){

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

        const ingredients = (data.ingredients ? 
            await this.prisma.ingredient.findMany({
                where: {
                    name: {
                        in: data.ingredients,
                    },
                },
            })
        : []);

        const additives = (data.additives ?
            await this.prisma.additive.findMany({
                where: {
                    name: {
                        in: data.additives,
                    },
                },
            })
        : []);


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
                classificationId: data.classificationId,
                ingredients: {
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.id,
                    })),
                },
                additives: {
                    create: additives.map((additive) => ({
                        additiveId: additive.id,
                    })),
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

        const food = await this.prisma.food.findUnique({
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

    async update(id: string, data: FoodDTO){
        const foodExists = await this.prisma.food.findUnique({
            where: {
                id: id,
            },
        });

        if (!foodExists) {
            throw new Error('Alimento não encontrado');
        }

        if (data.barcode) {
            const foodBarcodeExists = await this.prisma.food.findFirst({
                where: {
                    barcode: data.barcode,
                },
            });
    
            if (foodBarcodeExists && foodBarcodeExists.id !== id) {
                throw new Error('Este código de barras já está sendo usado');
            }
        }

        const ingredients = (data.ingredients ?
            await this.prisma.ingredient.findMany({
                where: {
                    name: {
                        in: data.ingredients,
                    },
                },
            })
        : []);

        const additives = (data.additives ?
            await this.prisma.additive.findMany({
                where: {
                    name: {
                        in: data.additives,
                    },
                },
            })
        : []);

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
                classificationId: data.classificationId,
                ingredients: {
                    deleteMany: {},
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.id,
                    })),
                },
                additives: {
                    deleteMany: {},
                    create: additives.map((additive) => ({
                        additiveId: additive.id,
                    })),
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
