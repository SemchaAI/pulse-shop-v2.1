'use server';
import { prisma } from '@/prisma/prismaClient';
import type {
  Category,
  Color,
  Image,
  Memory,
  Product,
  ProductInfo,
  ProductVariant,
  Ram,
  Tag,
} from '@prisma/client';
import { notFound } from 'next/navigation';

export interface IProductResponse {
  product: IProductSlug;
  currVariant: Variant & { product: IProductSlug };
  allVariants: Variant[];
  switchers: { color: Variant[]; ram: Variant[]; memory: Variant[] } | null;
}

export type Variant = ProductVariant & {
  color: Color | null;
  memory: Memory | null;
  ram: Ram | null;
  images: Image[];
};
export interface IProductSlug extends Product {
  variants: Variant[];
  category: Category;
  ProductInfo: ProductInfo[];
  tags: Tag[];
}

export async function getProduct(slug: string): Promise<IProductResponse> {
  const variant = await prisma.productVariant.findUnique({
    where: {
      slug,
    },
    include: {
      product: {
        include: {
          variants: {
            include: {
              color: true,
              memory: true,
              ram: true,
              images: {
                take: 1,
                where: {
                  isMain: true,
                },
              },
            },
          },
          category: true,
          ProductInfo: true,
          tags: true,
        },
      },
      color: true,
      memory: true,
      ram: true,
      images: true,
    },
  });

  if (!variant || !variant.product) {
    return notFound();
  }
  if (!variant.colorId || !variant.ramId || !variant.memoryId) {
    return {
      product: variant.product,
      currVariant: variant,
      allVariants: variant.product.variants,
      switchers: null,
    };
  }
  const allVariants = variant.product.variants;

  // START 1 of 2 VARIANTS
  function getMatchScore(v: Variant, variant: Variant): number {
    return (
      (v.colorId === variant.colorId ? 1 : 0) +
      (v.ramId === variant.ramId ? 1 : 0) +
      (v.memoryId === variant.memoryId ? 1 : 0)
    );
  }

  const uniqMemory = new Map<number, Variant>();
  const uniqRam = new Map<number, Variant>();
  const uniqColors = new Map<number, Variant>();

  allVariants.forEach((v) => {
    if (!v.colorId || !v.ramId || !v.memoryId) return;
    const score = getMatchScore(v, variant);
    // Update unique Memory map.
    if (!uniqMemory.has(v.memoryId)) {
      uniqMemory.set(v.memoryId, v);
    } else {
      const existingScore = getMatchScore(uniqMemory.get(v.memoryId)!, variant);
      if (score > existingScore) {
        uniqMemory.set(v.memoryId, v);
      }
    }

    // Update unique RAM map.
    if (!uniqRam.has(v.ramId)) {
      uniqRam.set(v.ramId, v);
    } else {
      const existingScore = getMatchScore(uniqRam.get(v.ramId)!, variant);
      if (score > existingScore) {
        uniqRam.set(v.ramId, v);
      }
    }

    // Update unique Colors map.
    if (!uniqColors.has(v.colorId)) {
      uniqColors.set(v.colorId, v);
    } else {
      const existingScore = getMatchScore(uniqColors.get(v.colorId)!, variant);
      if (score > existingScore) {
        uniqColors.set(v.colorId, v);
      }
    }
  });
  //END  1 of 2 VARIANTS

  return {
    product: variant.product,
    currVariant: variant,
    allVariants: variant.product.variants,
    switchers: {
      color: Array.from(uniqColors.values()),
      ram: Array.from(uniqRam.values()),
      memory: Array.from(uniqMemory.values()),
    },
  };
}

// function getScore(v: Variant): number {
//   return v.colorId! + v.ramId! + v.memoryId!;
// }
// const uniqMemory = new Map<number, Variant>();
// const uniqRam = new Map<number, Variant>();
// const uniqColors = new Map<number, Variant>();

// const currentScore = getScore(variant);

// function updateMap(
//   map: Map<number, Variant>,
//   key: number,
//   candidate: Variant,
//   candidateDiff: number
// ) {
//   const existing = map.get(key);
//   if (!existing) {
//     map.set(key, candidate);
//   } else {
//     const existingDiff = Math.abs(getScore(existing) - currentScore);
//     if (candidateDiff < existingDiff) {
//       map.set(key, candidate);
//     }
//   }
// }
// for (const v of allVariants) {
//   // Skip if any id is missing
//   if (!v.colorId || !v.ramId || !v.memoryId) continue;

//   const diff = Math.abs(getScore(v) - currentScore);
//   updateMap(uniqMemory, v.memoryId, v, diff);
//   updateMap(uniqRam, v.ramId, v, diff);
//   updateMap(uniqColors, v.colorId, v, diff);
// }
