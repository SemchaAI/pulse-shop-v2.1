import type { ICartResponse, ICartSliceData } from '@/models/cart';

export const getCartDetails = (cart: ICartResponse): ICartSliceData => {
  const cartProducts = cart.cartProducts.map((item) => ({
    id: item.id,
    productId: item.productVariant.productId,
    productVariantId: item.productVariantId,
    name: item.productVariant.name,
    slug: item.productVariant.slug,
    stock: item.productVariant.stock,
    price: item.productVariant.price,
    oldPrice: item.productVariant.oldPrice,
    totalRating: item.productVariant.totalRating,
    color: item.productVariant.color?.name || null,
    memory: item.productVariant.memory?.name || null,
    ram: item.productVariant.ram?.name || null,
    quantity: item.quantity,
    img: item.productVariant.images[0].url,
  }));

  return {
    cartProducts,
    cartTotal: cart.cartProducts.length,
    totalAmount: cart.totalAmount,
  };
};
