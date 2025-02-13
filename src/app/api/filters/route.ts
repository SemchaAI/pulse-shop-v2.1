import { prisma } from '@/prisma/prismaClient';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || '';

    const config: Prisma.ProductVariantWhereInput | undefined =
      category !== 'all'
        ? {
            product: {
              category: {
                name: { equals: category, mode: 'insensitive' },
              },
            },
          }
        : undefined;

    const someConfig = {
      productVariant: {
        some: config || {},
      },
    };
    const selectConfig = {
      id: true,
      name: true,
      _count: {
        select: {
          productVariant: config
            ? {
                where: config,
              }
            : true,
        },
      },
    };

    console.log('someConfig', config, someConfig, selectConfig);

    const [ram, memory, colors] = await prisma.$transaction([
      prisma.ram.findMany({
        where: someConfig,
        select: selectConfig,
        orderBy: { id: 'asc' },
      }),
      prisma.memory.findMany({
        where: someConfig,
        select: selectConfig,
        orderBy: { id: 'asc' },
      }),
      prisma.color.findMany({
        where: someConfig,
        select: selectConfig,
        orderBy: { productVariant: { _count: 'desc' } },
      }),
    ]);

    // const [colors, ram, memory] = await prisma.$transaction([
    //   prisma.productVariant.groupBy({
    //     where: {
    //       product: {
    //         category: {
    //           name: { equals: category, mode: 'insensitive' },
    //         },
    //       },
    //     },
    //     by: ['colorId'],
    //     orderBy: {
    //       colorId: 'asc',
    //     },
    //   }),
    //   prisma.productVariant.groupBy({
    //     where: {
    //       product: {
    //         category: {
    //           name: { equals: category, mode: 'insensitive' },
    //         },
    //       },
    //     },
    //     by: ['ramId'],
    //     orderBy: {
    //       ramId: 'asc',
    //     },
    //   }),
    //   prisma.productVariant.groupBy({
    //     where: {
    //       product: {
    //         category: {
    //           name: { equals: category, mode: 'insensitive' },
    //         },
    //       },
    //     },
    //     by: ['memoryId'],
    //     orderBy: {
    //       memoryId: 'asc',
    //     },
    //   }),
    // ]);
    //console.log('ram', ram, 'memory', memory, 'colors', colors);
    return NextResponse.json({ ram, memory, colors }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
