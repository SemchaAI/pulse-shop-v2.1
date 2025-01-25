import { LoginForm } from '@/components/features';
import { Container } from '@/components/shared';

export default function Login() {
  return (
    <section>
      <Container>
        <h2>Login</h2>
        <div>
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
