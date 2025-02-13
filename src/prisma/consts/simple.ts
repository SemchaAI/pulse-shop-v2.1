import { prisma } from '../prismaClient';

export async function CategoriesInit() {
  const SmartphonesCategory = await prisma.category.create({
    data: {
      name: 'Smartphones',
      slug: 'smartphones',
    },
  });

  const TabletsCategory = await prisma.category.create({
    data: {
      name: 'Tablets',
      slug: 'tablets',
    },
  });
  const LaptopsCategory = await prisma.category.create({
    data: {
      name: 'Laptops',
      slug: 'laptops',
    },
  });
  const AccessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'accessories',
    },
  });
  const TestCategory = await prisma.category.create({
    data: {
      name: 'Test2 Category',
      slug: 'test2-category',
    },
  });
  return {
    SmartphonesCategory,
    TabletsCategory,
    LaptopsCategory,
    AccessoriesCategory,
    TestCategory,
  };
}

export async function TagsInit() {
  const XiaomiTag = await prisma.tag.create({
    data: {
      name: 'Xiaomi',
      slug: 'xiaomi',
    },
  });

  const SamsungTag = await prisma.tag.create({
    data: {
      name: 'Samsung',
      slug: 'samsung',
    },
  });

  const AppleTag = await prisma.tag.create({
    data: {
      name: 'Apple',
      slug: 'apple',
    },
  });

  const BudgetTag = await prisma.tag.create({
    data: {
      name: 'Budget',
      slug: 'budget',
    },
  });

  const MidRangeTag = await prisma.tag.create({
    data: {
      name: 'Mid Range',
      slug: 'mid-range',
    },
  });

  const FlagshipTag = await prisma.tag.create({
    data: {
      name: 'Flagship',
      slug: 'flagship',
    },
  });

  const Winter2023Tag = await prisma.tag.create({
    data: {
      name: 'Winter 2023',
      slug: 'winter-2023',
    },
  });

  const Autumn2023Tag = await prisma.tag.create({
    data: {
      name: 'Autumn 2023',
      slug: 'autumn-2023',
    },
  });

  const Winter2024Tag = await prisma.tag.create({
    data: {
      name: 'Winter 2024',
      slug: 'winter-2024',
    },
  });

  return {
    XiaomiTag,
    SamsungTag,
    AppleTag,
    BudgetTag,
    MidRangeTag,
    FlagshipTag,
    Winter2023Tag,
    Autumn2023Tag,
    Winter2024Tag,
  };
}

export async function ColorsInit() {
  const White = await prisma.color.create({
    data: { name: 'White', hexCode: '#ffffff' },
  });
  const Black = await prisma.color.create({
    data: { name: 'Black', hexCode: '#000000' },
  });
  const Red = await prisma.color.create({
    data: { name: 'Red', hexCode: '#ff0000' },
  });
  const Green = await prisma.color.create({
    data: { name: 'Green', hexCode: '#00ff00' },
  });
  const LemonGreen = await prisma.color.create({
    data: { name: 'Lemon Green', hexCode: '#b5ba8f' },
  });
  const Blue = await prisma.color.create({
    data: { name: 'Blue', hexCode: '#395481' },
  });
  const Purple = await prisma.color.create({
    data: { name: 'Purple', hexCode: '#ff00ff' },
  });
  const Silver = await prisma.color.create({
    data: { name: 'Silver', hexCode: '#c0c0c0' },
  });
  const Gray = await prisma.color.create({
    data: { name: 'Gray', hexCode: '#6e6e6e' },
  });
  const Gold = await prisma.color.create({
    data: { name: 'Gold', hexCode: '#ffd700' },
  });

  return {
    White,
    Black,
    Red,
    Green,
    LemonGreen,
    Blue,
    Purple,
    Silver,
    Gray,
    Gold,
  };
}
export async function MemoryInit() {
  const Memory64GB = await prisma.memory.create({
    data: { name: '64GB' },
  });
  const Memory128GB = await prisma.memory.create({
    data: { name: '128GB' },
  });
  const Memory256GB = await prisma.memory.create({
    data: { name: '256GB' },
  });
  const Memory512GB = await prisma.memory.create({
    data: { name: '512GB' },
  });
  const Memory1TB = await prisma.memory.create({
    data: { name: '1TB' },
  });

  return {
    Memory64GB,
    Memory128GB,
    Memory256GB,
    Memory512GB,
    Memory1TB,
  };
}
export async function RAMInit() {
  const RAM4GB = await prisma.ram.create({
    data: { name: '4GB' },
  });
  const RAM8GB = await prisma.ram.create({
    data: { name: '8GB' },
  });
  const RAM12GB = await prisma.ram.create({
    data: { name: '12GB' },
  });
  const RAM16GB = await prisma.ram.create({
    data: { name: '16GB' },
  });

  return {
    RAM4GB,
    RAM8GB,
    RAM12GB,
    RAM16GB,
  };
}
