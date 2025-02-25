import { LoginForm } from '@/components/features';
import { Container, EntityBlock } from '@/components/shared';
export default function Login() {
  return (
    <section className="flex flex-col justify-center grow">
      <Container>
        <EntityBlock className="m-auto max-w-[600px]">
          <h1 className="typo-title-30 text-center">Sign in</h1>
          <LoginForm />
        </EntityBlock>
      </Container>
    </section>
  );
}
