import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AdditiveDTO } from './additive.dto';

@Injectable()
export class AdditiveService {
  constructor(private prisma: PrismaService) {}

  async create(data: AdditiveDTO) {
    // transforma o nome da classificação caixa baixa com a primeira letra da primeira palavra maiúscula
    data.name =
      data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

    const additiveExists = await this.prisma.additive.findFirst({
      where: {
        name: data.name,
      },
    });

    if (additiveExists) {
      throw new ConflictException('Aditivo já cadastrado');
    }

    try {
      const additive = await this.prisma.additive.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
      return additive;
    } catch (e) {
      throw new InternalServerErrorException('Erro ao criar aditivo');
    }
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

    if (!additive) {
      throw new NotFoundException('Aditivo não encontrado');
    }

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

  async update(id: string, data: AdditiveDTO) {
    const additiveExists = await this.prisma.additive.findUnique({
      where: {
        id: id,
      },
    });

    if (!additiveExists) {
      throw new NotFoundException('Aditivo não encontrado');
    }

    if (data.name) {
      data.name =
        data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

      const additiveNameUsed = await this.prisma.additive.findFirst({
        where: {
          name: data.name,
        },
      });
      if (additiveNameUsed) {
        throw new ConflictException('Aditivo com esse nome já existe');
      }
    } else {
      data.name = additiveExists.name;
    }

    try {
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
    } catch (e) {
      throw new InternalServerErrorException('Erro ao atualizar aditivo');
    }
  }

  async delete(id: string) {
    const additiveExists = await this.prisma.additive.findUnique({
      where: {
        id: id,
      },
    });

    if (!additiveExists) {
      throw new NotFoundException('Aditivo não encontrado');
    }

    try {
      const additive = await this.prisma.additive.delete({
        where: {
          id: id,
        },
      });
      return additive;
    } catch (e) {
      throw new InternalServerErrorException('Erro ao deletar aditivo');
    }
  }
}
