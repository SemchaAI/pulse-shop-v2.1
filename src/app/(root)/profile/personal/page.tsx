import { userData } from '@/app/actions';
import { PersonalDataForm } from '@/components/features';
import { Container } from '@/components/shared';
import { ProfileNav } from '@/components/widgets';

export default async function ProfilePage() {
  const user = await userData();
  return (
    <section className="flex py-2 grow">
      <Container>
        <div className="flex flex-wrap gap-5 h-full">
          <ProfileNav />

          <div className="flex grow flex-col gap-5">
            <PersonalDataForm user={user} />
          </div>
        </div>
      </Container>
    </section>
  );
}
