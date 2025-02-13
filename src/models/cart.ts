import type {
  Cart,
  CartProduct,
  Color,
  Image,
  Memory,
  Product,
  ProductVariant,
  Ram,
} from '@prisma/client';
import { IUserSession } from './auth';

export interface ICart extends Cart {
  cartProducts: ICartProduct[];
}
export interface ICartProducts extends CartProduct {
  productVariant: ProductVariant[];
}
export interface ICartProduct extends CartProduct {
  productVariant: IProductVariant;
}
export interface ICartItem {
  productVariantId: number;
  quantity?: number;
}

interface IProductVariant extends ProductVariant {
  product: Product;
  color: Color | null;
  memory: Memory | null;
  ram: Ram | null;
  images: Image[];
}

//flat
export interface IFlatCartProduct {
  id: number;
  productId: number;
  productVariantId: number;
  name: string;
  slug: string;
  stock: number;
  price: number;
  oldPrice: number | null;
  totalRating: number;
  color: string | null;
  memory: string | null;
  ram: string | null;
  quantity: number;
  img: string;
}
export interface ICartAdditionalInfo {
  totalAmount: number;
  cartTotal: number;
}
export interface ICartResponse extends ICartAdditionalInfo {
  cartProducts: ICartProduct[];
}
export interface ICartSliceData extends ICartAdditionalInfo {
  cartProducts: IFlatCartProduct[];
}
//tmp
// export interface CriticalData {
//   user: IUserSession | null;
//   cart: ICartSliceData;
//   favorite: {
//     favoriteProducts: never[];
//     favoriteTotal: number;
//   };
// }
export interface CriticalData {
  user: IUserSession | null;
  favoriteTotal: number;
  cartTotal: number;
}
