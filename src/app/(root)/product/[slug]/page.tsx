import Image from 'next/image';
import { Heart, ShoppingCart, WalletCards } from 'lucide-react';

import { ProductCarousel, ProductDetails } from '@/components/entities';
import { Button, Container, EntityBlock } from '@/components/shared';
import { ProductSwitcher } from '@/components/features';

import { getProduct } from './getProductAction';

import { NEXT_PUBLIC_IMAGES_HOST } from '@/utils/consts';
interface IProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: IProps) {
  const { slug } = await params;
  const { currVariant, product, switchers } = await getProduct(slug);
  // const variants = getSwitchers(currVariant, allVariants);
  return (
    <section className="my-5">
      <Container>
        <div className="flex flex-col gap-5">
          <h1 className="text-center md:text-start typo-title-30 text-text-highlight">
            {currVariant.name}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap lg:flex-nowrap items-stretch  justify-between">
            <div className="flex flex-col gap-5 w-full">
              {currVariant.images.length > 1 ? (
                <div className="sm:min-w-[400px] lg:min-w-[600px] mx-auto sm:m-0">
                  <ProductCarousel slides={currVariant.images} />
                </div>
              ) : (
                <Image
                  src={`${NEXT_PUBLIC_IMAGES_HOST}${currVariant.images[0].url}`}
                  alt={currVariant.name}
                  width={450}
                  height={450}
                  className="rounded-2xl bg-foreground"
                />
              )}
            </div>

            <div className="flex flex-col gap-5 min-w-[320px] w-full h-[inherit]">
              <EntityBlock className="flex flex-col gap-2">
                <p>Price: {currVariant.price}MDL</p>
                {currVariant.oldPrice && (
                  <p>Old price: {currVariant.oldPrice}MDL</p>
                )}
                <p>Rating: {currVariant.totalRating}</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex w-full gap-2">
                    <div className="w-1/2 gap-1">
                      {currVariant.stock ? (
                        <Button
                          size="full"
                          version="contain"
                          className="gap-1"
                        >
                          <ShoppingCart /> Add to cart
                        </Button>
                      ) : (
                        <span className="flex items-center justify-center w-full h-full rounded-full bg-error text-white">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <Button
                      version="outline"
                      className="w-1/2 gap-1"
                    >
                      <Heart /> Favorite
                    </Button>
                  </div>
                  <Button
                    size="full"
                    version="outline"
                    className="gap-1"
                  >
                    <WalletCards /> Buy
                  </Button>
                </div>
              </EntityBlock>

              <div className="flex flex-col gap-2">
                {switchers &&
                  Object.entries(switchers).map(([type, variants]) => {
                    return (
                      <ProductSwitcher
                        key={type}
                        isColor={type === 'color'}
                        currentVariant={currVariant}
                        type={type as keyof typeof switchers}
                        variants={variants}
                      />
                    );
                  })}
              </div>
              {/* <EntityBlock className="grow">
                <div className="w-full h-full border border-border rounded-2xl" />
              </EntityBlock> */}
            </div>
          </div>
        </div>
        <div className="mt-5">
          {/* <EntityBlock className="flex flex-col gap-2"> */}
          <h3 className="typo-body-16 text-text-highlight">Tags:</h3>
          <ul className="flex gap-2 flex-wrap w-full">
            {product.tags.map((item) => (
              <li
                key={item.id}
                className="flex border border-border rounded-full px-2 py-1"
              >
                <span className="typo-body-12">{item.name}</span>
              </li>
            ))}
          </ul>
          {/* </EntityBlock> */}
        </div>
        <div className="mt-5">
          <h3 className="typo-body-16 text-text-highlight">Description:</h3>
          <p className="typo-body-14">{product.description}</p>
        </div>
        <div className="mt-5">
          <ProductDetails productInfo={product.ProductInfo} />
        </div>
      </Container>
    </section>
  );
}

{
  /* <div className="flex flex-col gap-2">
<h3 className="typo-body-16 text-text-highlight">Colors:</h3>
<ul className="flex gap-2 flex-wrap">
  {colorVariants.map((item) => (
    <li
      key={item.id}
      className="flex gap-2 justify-start "
    >
      <Link
        className={`${
          currVariant.colorId === item.colorId
            ? 'pointer-events-none'
            : ''
        }`}
        href={`/product/${item.slug}`}
      >
        <NextImage
          className={`border ${
            currVariant.colorId === item.colorId
              ? 'border-primary'
              : ''
          } rounded-lg transition duration-300 p-0.5 h-14 w-14 hover:border-primary`}
          src={NEXT_PUBLIC_IMAGES_HOST + item.images[0].url}
          alt={item.name}
          width={56}
          height={56}
        />
      </Link>
    </li>
  ))}
</ul>
</div> */
}
/* {ramVariants.length > 0 && ramVariants[0].ram && (
  <div className="flex flex-col gap-2">
    <h3 className="typo-body-16 text-text-highlight">Ram:</h3>
    <ul className="flex gap-2 flex-wrap">
      {ramVariants.map(
        (item) =>
          item.ram && (
            <li
              key={item.id}
              className="flex gap-2 justify-start "
            >
              <Link
                className={`${
                  currVariant.ramId === item.ramId
                    ? 'pointer-events-none'
                    : ''
                }`}
                href={`/product/${item.slug}`}
              >
                <div
                  className={`border ${
                    currVariant.ramId === item.ramId
                      ? 'border-primary'
                      : ''
                  } rounded-full transition duration-300 p-1.5 hover:border-primary`}
                >
                  {item.ram.name}
                </div>
              </Link>
            </li>
          )
      )}
    </ul>
  </div>
)} */
/* {memoryVariants.length > 0 && memoryVariants[0].memory && (
  <div className="flex flex-col gap-2">
    <h3 className="typo-body-16 text-text-highlight">Memory:</h3>
    <ul className="flex gap-2 flex-wrap">
      {memoryVariants.map(
        (item) =>
          item.memory && (
            <li
              key={item.id}
              className="flex gap-2 justify-start "
            >
              <Link
                className={`${
                  currVariant.memoryId === item.memoryId
                    ? 'pointer-events-none'
                    : ''
                }`}
                href={`/product/${item.slug}`}
              >
                <div
                  className={`border ${
                    currVariant.memoryId === item.memoryId
                      ? 'border-primary'
                      : ''
                  } rounded-full transition duration-300 p-1.5 hover:border-primary`}
                >
                  {item.memory.name}
                </div>
              </Link>
            </li>
          )
      )}
    </ul>
  </div>
)} */
