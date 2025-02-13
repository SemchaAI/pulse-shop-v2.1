// export const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
// export const JWT_ACCESS = process.env.NEXT_JWT_ACCESS_SECRET;
// export const JWT_REFRESH = process.env.NEXT_JWT_REFRESH_SECRET;

// export const GOOGLE_ID = process.env.GOOGLE_ID;
// export const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

// export const NEXT_PUBLIC_IMAGES_HOST = process.env.NEXT_PUBLIC_IMAGES_HOST;
const safeEnv = {
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  NEXT_PUBLIC_SERVER_DOMAIN_URL:
    process.env.NEXT_PUBLIC_SERVER_DOMAIN_URL || '',
  NEXT_PUBLIC_IMAGES_HOST: process.env.NEXT_PUBLIC_IMAGES_HOST || '',
  GOOGLE_ID: process.env.GOOGLE_ID || '',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || '',
  JWT_ACCESS: process.env.NEXT_JWT_ACCESS_SECRET || '',
  JWT_REFRESH: process.env.NEXT_JWT_REFRESH_SECRET || '',
};

Object.entries(safeEnv).forEach(([key, value]) => {
  if (!value && value.startsWith('NEXT_PUBLIC'))
    throw new Error(`${key} is not defined`);
});

export const {
  GOOGLE_ID,
  GOOGLE_SECRET,
  JWT_ACCESS,
  JWT_REFRESH,
  NEXT_PUBLIC_IMAGES_HOST,
  NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_SERVER_DOMAIN_URL,
} = safeEnv;
