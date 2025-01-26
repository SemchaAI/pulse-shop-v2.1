'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { KeyRound, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { handleCredentialsLogin } from '@/app/(root)/login/loginActions';

import { FieldInput, Form } from '@/components/entities';
import { Min5, queryKeys, ReqMin5Max20Validation } from '@/utils/consts';
import type { ILoginForm } from '@/models/forms';
import { queryClient } from '@/utils/queryClient';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<ILoginForm>({
    defaultValues: {
      emailOrName: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const submitHandler = async (data: ILoginForm) => {
    const { emailOrName, password } = data;
    try {
      const response = await handleCredentialsLogin({
        emailOrName,
        password,
      });
      if (!response) {
        throw Error();
      }
      if ('error' in response) {
        throw new Error(response.error);
      }
      console.log('response', response);

      toast.success(`${response.message}`, {
        duration: 30000,
        position: 'top-center',
        icon: '👏',
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.session });
      router.push('/');
    } catch (error) {
      console.log('error', error);
      toast.error(`Auth error. ${error}`);
    }
  };
  return (
    <Form
      form={form}
      onSubmit={submitHandler}
    >
      {
        <div className="w-full flex flex-col gap-2">
          <FieldInput
            initType="text"
            Icon={User}
            id="emailOrName"
            name="emailOrName"
            placeholder="Email/Name"
            validation={Min5}
          />
          <FieldInput
            initType="password"
            Icon={KeyRound}
            id="password"
            name="password"
            placeholder="password"
            validation={ReqMin5Max20Validation}
            EyeIcon
          />
        </div>
      }
      {<button type="submit">Submit</button>}
    </Form>
  );
};
