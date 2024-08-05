import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { DeseaseDTO } from './desease.dto';

@Injectable()
export class DeseaseService {
  constructor(private prisma: PrismaService) {}

  async create(data: DeseaseDTO) {
    // transforma o nome da classificação caixa baixa com a primeira letra da primeira palavra maiúscula
    data.name =
      data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

    const deseaseExists = await this.prisma.desease.findFirst({
      where: {
        name: data.name,
      },
    });

    if (deseaseExists) {
      throw new ConflictException('Doença já cadastrada');
    }

    try {
      const desease = await this.prisma.desease.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
      return desease;
    } catch (e) {
      throw new InternalServerErrorException('Erro ao criar doença');
    }
  }

  async findAll() {
    return await this.prisma.desease.findMany();
  }

  async findOne(id: string) {
    const desease = await this.prisma.desease.findUnique({
      where: {
        id: id,
      },
    });

    if (!desease) {
      throw new NotFoundException('Doença não encontrada');
    }

    return desease;
  }

  async findManyByName(name: string) {
    const deseases = await this.prisma.desease.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return deseases;
  }

  async update(id: string, data: DeseaseDTO) {
    const deseaseExists = await this.prisma.desease.findUnique({
      where: {
        id: id,
      },
    });

    if (!deseaseExists) {
      throw new NotFoundException('Doença não encontrada');
    }

    if (data.name) {
      data.name =
        data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();

      const deseaseNameUsed = await this.prisma.desease.findFirst({
        where: {
          name: data.name,
        },
      });
      if (deseaseNameUsed) {
        throw new ConflictException('Nome para doença já usado');
      }
    } else {
      data.name = deseaseExists.name;
    }

    try {
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
    } catch (e) {
      throw new InternalServerErrorException('Erro ao atualizar doença');
    }
  }

  async delete(id: string) {
    const deseaseExists = await this.prisma.desease.findUnique({
      where: {
        id: id,
      },
    });

    if (!deseaseExists) {
      throw new NotFoundException('Doença não encontrada');
    }

    try {
      const desease = await this.prisma.desease.delete({
        where: {
          id: id,
        },
      });
      return desease;
    } catch (e) {
      throw new InternalServerErrorException('Erro ao deletar doença');
    }
  }
}
