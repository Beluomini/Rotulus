import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new Error('Este email já está sendo usado');
    }

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: (data.password ? await bcrypt.hash(data.password, 10) : data.password),
        passwordRec: data.passwordRec,
        status: data.status,
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        ingredientAlergies: {
          include: {
            ingredient: true,
          },
        },
        additiveAlergies: {
          include: {
            additive: true,
          },
        },
        foods: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        ingredientAlergies: {
          include: {
            ingredient: true,
          },
        },
        additiveAlergies: {
          include: {
            additive: true,
          },
        },
        foods: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    if(data.email){
      const userExistsEmail = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
  
      if (userExistsEmail && userExistsEmail.id !== id) {
        throw new Error('Este email já está sendo usado');
      }
    }


    const foods = (data.foodsHist ? 
      await this.prisma.food.findMany({
        where: {
          id: {
            in: data.foodsHist,
          },
        },
      }) 
      : []);


    const ingredientAlergies = (data.ingredientAlergies ?
      await this.prisma.ingredient.findMany({
        where: {
          id: {
            in: data.ingredientAlergies,
          },
        },
      })
      : []);

    const additiveAlergies = (data.additiveAlergies ?
      await this.prisma.additive.findMany({
        where: {
          id: {
            in: data.additiveAlergies,
          },
        },
      })
      : []);

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: (data.password ? await bcrypt.hash(data.password, 10) : data.password),
        passwordRec: data.passwordRec,
        status: data.status,
        ingredientAlergies: {
          deleteMany: {},
          create: 
          ingredientAlergies.map((ingredient) => ({
            ingredientId: ingredient.id,
          })),
        },
        additiveAlergies: {
          deleteMany: {},
          create: additiveAlergies.map((additive) => ({
            additiveId: additive.id,
          })),
        },
        foods: {
          deleteMany: {},
          create: foods.map((food) => ({
            foodId: food.id,
          })),
        },
      },
    });
    return user;
  }

  async updateHist(id: string, data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    if(data.email){
      const userExistsEmail = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
  
      if (userExistsEmail && userExistsEmail.id !== id) {
        throw new Error('Este email já está sendo usado');
      }
    }


    const foods = (data.foodsHist ? 
      await this.prisma.food.findMany({
        where: {
          id: {
            in: data.foodsHist,
          },
        },
      }) 
      : []);


    const ingredientAlergies = (data.ingredientAlergies ?
      await this.prisma.ingredient.findMany({
        where: {
          name: {
            in: data.ingredientAlergies,
          },
        },
      })
      : []);

    const additiveAlergies = (data.additiveAlergies ?
      await this.prisma.additive.findMany({
        where: {
          name: {
            in: data.additiveAlergies,
          },
        },
      })
      : []);

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordRec: data.passwordRec,
        status: data.status,
        ingredientAlergies: {
          deleteMany: {},
          create: 
          ingredientAlergies.map((ingredient) => ({
            ingredientId: ingredient.id,
          })),
        },
        additiveAlergies: {
          deleteMany: {},
          create: additiveAlergies.map((additive) => ({
            additiveId: additive.id,
          })),
        },
        foods: {
          deleteMany: {},
          create: foods.map((food) => ({
            foodId: food.id,
          })),
        },
      },
    });
    return user;
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userExists) {
      throw new Error('Usuário não encontrado');
    }

    const user = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  }
}
