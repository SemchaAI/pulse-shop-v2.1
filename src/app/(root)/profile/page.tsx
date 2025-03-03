import { Container } from '@/components/shared';
import { ProfileNav } from '@/components/widgets';

export default function ProfilePage() {
  return (
    <section className="flex py-2 grow">
      <Container>
        <div className="flex flex-wrap gap-5 h-full">
          <ProfileNav />
          <div></div>
        </div>
      </Container>
    </section>
  );
}
