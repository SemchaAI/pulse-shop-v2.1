import { NEXT_PUBLIC_SERVER_URL } from './env';

export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  PRODUCT: '/product/:id',
  CART: '/cart',
  FAVORITES: '/favorites',
  PROFILE: '/profile',
  TABLETS: '/categories/tablets',
  LAPTOPS: '/categories/laptops',
  SMARTPHONES: '/categories/smartphones',
  ACCESSORIES: '/categories/accessories',
  ALL: '/categories/all',
};
export const API_ROUTES = {
  FILTERS: '/api/filters',
  REFRESH: '/api/auth/refresh',
  ACTIVATION: '/api/auth/activation',
  SESSION: '/api/auth/session',
  CREDENTIALS: '/api/auth/credentials',
  GUEST: '/api/auth/credentials/guest',
  GOOGLE: '/api/auth/google',
  GOOGLE_CALLBACK: `${NEXT_PUBLIC_SERVER_URL}/auth/google/callback`,
  CART: '/api/cart',
  FAVORITE: '/api/favorite',
};
