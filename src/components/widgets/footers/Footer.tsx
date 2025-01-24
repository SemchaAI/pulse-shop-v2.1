import { Container } from '@/components/shared';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full relative h-20 bg-foreground after:absolute after:top-0 after:left-0 after:w-full after:h-0 after:content[''] after:border-t after:border-solid after:border-foreground-muted">
      <Container>
        <div className="h-20 flex items-center">
          <p className="w-full text-end typo-body-14">
            © {year}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};
