import type { ICategory } from '@/models/prisma';
import { prisma } from '@/prisma/prismaClient';

interface IProps {
  params: {
    name: string;
  };
}
async function getCategoryProducts(name: string) {
  const category: ICategory | null = await prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
    include: {
      products: {
        include: {
          productItem: {
            orderBy: {
              id: 'desc',
            },
            take: 1,
          },
        },
        take: 5,
      },
    },
  });
  if (!category) return null;
  return (
    <ul>
      {category.products.map((product) =>
        product.productItem.map((item) => (
          <li key={item.id}>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <div>{item.cnt}</div>
          </li>
        ))
      )}
    </ul>
  );
}

export default async function Category({ params }: IProps) {
  const { name } = await params;
  const products = getCategoryProducts(name);
  return (
    <>
      <div>Page {name}</div>
      {products}
    </>
  );
}
