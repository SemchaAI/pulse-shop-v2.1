import type { ProductInfo } from '@prisma/client';

interface IProps {
  productInfo: ProductInfo[];
}

export const ProductDetails = ({ productInfo }: IProps) => {
  const infoGuard = productInfo && productInfo.length > 0;

  if (!infoGuard)
    return (
      <div className="text-text-highlight typo-title-24">
        No characteristics
      </div>
    );

  return (
    <div>
      <h2 className="typo-title-24">Characteristics</h2>
      <div className="mt-5 p-5 flex flex-col gap-2 rounded-2xl bg-foreground">
        {productInfo.map((information: ProductInfo) => (
          <div
            key={information.id}
            className="flex justify-between border-b border-border"
          >
            <h2 className="typo-body-16 text-text-highlight">
              {information.title}
            </h2>
            <p className="typo-body-14">{information.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
