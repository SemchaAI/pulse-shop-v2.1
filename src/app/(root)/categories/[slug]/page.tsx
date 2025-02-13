'use client';
import { Container } from '@/components/shared';
import { Filters } from '@/components/widgets';
import { Products } from './getProducts';

export default function Categories() {
  return (
    <div className="flex grow">
      <Container>
        <div className="flex h-full flex-col gap-5 mt-5  md:flex-row md:m-0">
          <Filters />
          <Products />
        </div>
      </Container>
    </div>
  );
}
