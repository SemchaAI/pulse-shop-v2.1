import type { Image, ProductVariant, Category, Product } from '@prisma/client';

export interface ICategory extends Category {
  products: IProduct[];
}
export interface IProduct extends Product {
  images: Image[];
  variants: ProductVariant[];
}

export interface ISearchProductVariant extends ProductVariant {
  images: Image[];
}
