import { Category, Product, ProductItem } from '@prisma/client';

export interface IProduct extends Product {
  productItem: ProductItem[];
}
export interface ICategory extends Category {
  products: IProduct[];
}
