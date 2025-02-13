import type { ISearchProductVariant } from '@/models/prisma';
import { prisma } from '@/prisma/prismaClient';
import { createPaginator } from '@/utils/api/helpers/pagination';
import { filtersConfig } from '@/utils/consts';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const { min, max } = filtersConfig();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Extract query parameters
    const name = searchParams.get('name') || '';
    const category = searchParams.get('category') || '';
    // const tags = searchParams.get('tags')?.split(',');

    //filters
    const colors = searchParams.get('colors')?.split(',').map(Number);
    const ram = searchParams.get('ram')?.split(',').map(Number);
    const memory = searchParams.get('memory')?.split(',').map(Number);
    const minPrice = searchParams.get('priceFrom')
      ? Number(searchParams.get('priceFrom'))
      : min;
    const maxPrice = searchParams.get('priceTo')
      ? Number(searchParams.get('priceTo'))
      : max;

    //pagination
    const page = Number(searchParams.get('page')) || 1; // Default to page 1
    const perPage = Number(searchParams.get('limit')) || 9; // Default limit 9

    if (category) {
      const categoryExists = await prisma.category.findUnique({
        where: { slug: category },
      });
      if (!categoryExists) {
        return NextResponse.json(
          { message: 'Category not found' },
          { status: 404 }
        );
      }
    }

    const paginate = createPaginator({ page, perPage });

    const res = await paginate<
      ISearchProductVariant,
      Prisma.ProductVariantFindManyArgs
    >(
      prisma.productVariant,
      {
        where: {
          colorId: colors?.length ? { in: colors } : {},
          memoryId: memory?.length ? { in: memory } : {},
          ramId: ram?.length ? { in: ram } : {},
          price: { gte: minPrice, lte: maxPrice },
          name: { contains: name, mode: 'insensitive' },
          product: {
            category: { name: { contains: category, mode: 'insensitive' } },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          images: {
            take: 1,
            where: {
              isMain: true,
            },
          },
        },
      },
      { page }
    );
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Something went wrong';
    console.error(`[SEARCH PRODUCTS] Server error: ${msg}`);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
