'use client';
import { Plus } from 'lucide-react';
import { Button, Container } from '@/components/shared';
import { customFetch } from '@/utils/api';
import toast from 'react-hot-toast';

// import { useSession } from '@/utils/hooks';

export default function Test() {
  // const { data, status } = useSession();

  const clickHandler = async () => {
    try {
      const res = await customFetch('/api/test', { method: 'GET' });
      console.log('res', await res.json());
      toast.success('Success test');
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Something went wrong';
      //console.log('error', error);
      toast.error(`${msg}`);
    }
  };
  console.log('status');
  return (
    <div className="my-5">
      <Container>
        <Button
          size="full"
          version="contain"
          onClick={clickHandler}
        >
          Test api
        </Button>
        <Button
          className="mt-5"
          type="button"
          version="outline"
          onClick={clickHandler}
        >
          Test api
        </Button>
        <Button
          className="mt-5"
          onClick={clickHandler}
        >
          Test api
        </Button>
        <Button
          className="mt-5"
          onClick={clickHandler}
          icon
        >
          <Plus size={20} />
        </Button>
      </Container>
    </div>
  );
}
