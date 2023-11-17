import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { FoodDTO } from './food.dto';

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

        // Ingredientes que serão adicionados ao alimento
        const ingredients = await this.prisma.ingredient.findMany();


        const food = await this.prisma.food.create({
            data: {
                name: data.name,
                barcode: data.barcode,
                description: data.description,
                brandName: data.brandName,
                energyValue: data.energyValue,
                carbohydrate: data.carbohydrate,
                totalSugar: data.totalSugar,
                addedSugar: data.addedSugar,
                protein: data.protein,
                totalFat: data.totalFat,
                saturatedFat: data.saturatedFat,
                transFat: data.transFat,
                classificationId: data.classificationId,
                ingredients: {
                    create: ingredients.map((ingredient) => ({
                        ingredientId: ingredient.id,
                        name: ingredient.name,
                    })),
                },
            },
        });
        return food;
    }

    async findAll() {
        return await this.prisma.food.findMany();
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
            },
        });

        if (!food) {
            throw new Error('Alimento não encontrado');
        }

        return food;
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

        const food = await this.prisma.food.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                barcode: data.barcode,
                description: data.description,
                brandName: data.brandName,
                energyValue: data.energyValue,
                carbohydrate: data.carbohydrate,
                totalSugar: data.totalSugar,
                addedSugar: data.addedSugar,
                protein: data.protein,
                totalFat: data.totalFat,
                saturatedFat: data.saturatedFat,
                transFat: data.transFat,
                classificationId: data.classificationId,
            },
        });
        return food;
    }

    async delete(id: string) {
        const foodExists = await this.prisma.food.findUnique({
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
