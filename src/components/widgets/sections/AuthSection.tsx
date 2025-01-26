'use client';
import { RegisterForm } from '@/components/features';
import { Container } from '@/components/shared';
import { usePathname } from 'next/navigation';

export const AuthSection = () => {
  const isLogin = usePathname() === '/login';
  const title = isLogin ? 'Sign in' : 'Registration';
  return (
    <section>
      <Container>
        <h2>{title}</h2>
        {/* <hr /> */}
        <div>
          <RegisterForm />
        </div>
      </Container>
    </section>
  );
};
