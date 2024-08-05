import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ClassificationDTO } from './classification.dto';

@Injectable()
export class ClassificationService {
  constructor(private prisma: PrismaService) {}

  async create(data: ClassificationDTO) {
    const classificationExists = await this.prisma.classification.findFirst({
      where: {
        name:
          data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase(),
      },
    });

    if (classificationExists) {
      throw new ConflictException('Classificação já cadastrada');
    }

    // transforma o nome da classificação caixa baixa com a primeira letra da primeira palavra maiúscula
    data.name =
      data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

    try {
      const classification = await this.prisma.classification.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
      return classification;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao criar classificação');
    }
  }

  async findAll() {
    return await this.prisma.classification.findMany();
  }

  async findOne(id: string) {
    const classification = await this.prisma.classification.findUnique({
      where: {
        id: id,
      },
    });

    if (!classification) {
      throw new NotFoundException('Classificação não encontrada');
    }

    return classification;
  }

  async findManyByName(name: string) {
    const classifications = await this.prisma.classification.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return classifications;
  }

  async update(id: string, data: ClassificationDTO) {
    const classificationExists = await this.prisma.classification.findUnique({
      where: {
        id: id,
      },
    });

    if (!classificationExists) {
      throw new NotFoundException('Classificação não encontrada');
    }

    if (data.name) {
      const classNameUsed = await this.prisma.classification.findFirst({
        where: {
          name:
            data.name.charAt(0).toUpperCase() +
            data.name.slice(1).toLowerCase(),
        },
      });

      if (classNameUsed) {
        throw new ConflictException(
          'Este nome de classificação já está sendo usado',
        );
      }
    }

    try {
      const classification = await this.prisma.classification.update({
        where: {
          id: id,
        },
        data: {
          name:
            data.name === undefined
              ? classificationExists.name
              : data.name.charAt(0).toUpperCase() +
                data.name.slice(1).toLowerCase(),
          description: data.description,
        },
      });
      return classification;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao editar classificação');
    }
  }

  async delete(id: string) {
    const classificationExists = await this.prisma.classification.findUnique({
      where: {
        id: id,
      },
    });

    if (!classificationExists) {
      throw new NotFoundException('Classificação não encontrada');
    }

    const foodExists = await this.prisma.food.findFirst({
      where: {
        classificationId: id,
      },
    });

    if (foodExists) {
      throw new ConflictException(
        'Classificação não pode ser deletada pois está relacionada à um alimento',
      );
    }

    try {
      const classification = await this.prisma.classification.delete({
        where: {
          id: id,
        },
      });
      return classification;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao deletar classificação');
    }
  }
}
