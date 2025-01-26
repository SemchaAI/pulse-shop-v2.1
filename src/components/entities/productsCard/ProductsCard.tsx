import type { IProduct } from '@/models/prisma';
import type { ProductItem } from '@prisma/client';
import Image from 'next/image';

interface IProps {
  productItem: ProductItem;
  product: IProduct;
}

export const ProductsCard = ({ productItem, product }: IProps) => {
  const url = process.env.NEXT_PUBLIC_IMAGES_HOST;
  return (
    <div
      className="transform translate-x-0 min-w-0 flex-shrink-0 flex-grow-0 basis-[80%] sm:basis-[calc(50%-0.5rem)] md:basis-[calc(33.33%-0.66rem)] lg:basis-[calc(25%-0.75rem)]"
      key={productItem.id}
    >
      <div className="relative bg-foreground border border-border rounded-lg overflow-hidden">
        <div className="flex flex-col p-4 justify-between">
          <Image
            className="flex m-auto transition-transform hover:scale-105 focus:scale-105"
            alt={productItem.title}
            src={url + productItem.img}
            width={200}
            height={200}
          />
          <h4 className="text-lg font-semibold line-clamp-1">
            {productItem.title}
          </h4>
          <div className="w-full flex justify-between">
            <p>Rating:</p>
            <div>{product.totalRating} stars</div>
          </div>
          <div className="w-full flex flex-col justify-end h-12">
            {productItem.oldPrice && (
              <div>
                <p>
                  Old price:
                  <span className="line-through">
                    {productItem.oldPrice} MDL
                  </span>
                </p>
              </div>
            )}
            <p className="line-clamp-1">Price: {productItem.price} MDL</p>
          </div>
        </div>
      </div>
    </div>
  );
};
