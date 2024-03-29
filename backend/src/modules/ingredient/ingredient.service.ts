import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { IngredientDTO } from './ingredient.dto';

@Injectable()
export class IngredientService {

    constructor (private prisma: PrismaService) {}

    async create(data: IngredientDTO) {

        const ingredientExists = await this.prisma.ingredient.findFirst({
            where: {
                name: data.name,
            },
        });

        if (ingredientExists) {
            throw new Error('Este ingrediente já está sendo usado');
        }

        // transforma o nome da classificação caixa baixa com a primeira letra da primeira palavra maiúscula
        data.name = data.name.charAt(0).toUpperCase()+data.name.slice(1).toLowerCase();

        const ingredient = await this.prisma.ingredient.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return ingredient;
    }

    async findAll() {
        return await this.prisma.ingredient.findMany();
    }

    async findOne(id: string) {
        const ingredient = await this.prisma.ingredient.findFirst({
            where: {
                id: id,
            },
        });
        return ingredient;
    }

    async findManyByName(name: string) {
        const ingredients = await this.prisma.ingredient.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
        });
        return ingredients;
    }

    async update(id: string, data: IngredientDTO){
        const ingredientExists = await this.prisma.ingredient.findUnique({
            where: {
                id: id,
            },
        });

        if (!ingredientExists) {
            throw new Error('Ingrediente não encontrado');
        }

        const ingredient = await this.prisma.ingredient.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return ingredient;
    }

    async delete(id: string) {
        const ingredientExists = await this.prisma.ingredient.findUnique({
            where: {
                id: id,
            },
        });

        if (!ingredientExists) {
            throw new Error('Ingrediente não encontrado');
        }

        const ingredient = await this.prisma.ingredient.delete({
            where: {
                id: id,
            },
        });
        return ingredient;
    }

}
