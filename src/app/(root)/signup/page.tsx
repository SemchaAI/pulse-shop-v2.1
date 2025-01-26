import { RegisterForm } from '@/components/features';
import { Container } from '@/components/shared';
// import { AuthSection } from '@/components/widgets';

export default function Signup() {
  return (
    <>
      {/* <AuthSection /> */}
      <section>
        <Container>
          <h2>Sign up</h2>
          {/* <hr /> */}
          <div>
            <RegisterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
