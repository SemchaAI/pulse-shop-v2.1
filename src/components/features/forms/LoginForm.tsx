'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Github, KeyRound, Plus, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { handleCredentialsLogin } from '@/app/(root)/login/loginActions';

import { FieldInput, Form } from '@/components/entities';
import {
  API_ROUTES,
  Min5,
  queryKeys,
  ReqMin5Max20Validation,
  ROUTES,
} from '@/utils/consts';
import type { ILoginForm } from '@/models/forms';
import { queryClient } from '@/utils/queryClient';
import { Button } from '@/components/shared';
import Link from 'next/link';

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
      //mb dont need it because of push
      queryClient.invalidateQueries({ queryKey: [queryKeys.session] });
      router.push('/');
    } catch (error) {
      console.log('error', error);
      toast.error(`Auth error. ${error}`);
    }
  };
  const googleHandler = async () => {
    try {
      window.location.href = API_ROUTES.GOOGLE;
    } catch (error) {
      console.log('error', error);
      toast.error('Google auth error. Please try again.');
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
      {
        <>
          <div className="pt-2 pb-4 border-b border-border">
            <div className="flex justify-between typo-body-16 p-2">
              <p className="">Don`t have an account?</p>
              <Link
                className="flex gap-1 items-center justify-center text-primary hover:underline focus:underline"
                href={ROUTES.SIGNUP}
              >
                Sign up
              </Link>
            </div>
            <Button
              aria-label="login"
              type="submit"
              version="outline"
              size="full"
            >
              Login
            </Button>
          </div>
          <div className="flex gap-2 pt-5">
            <Button
              aria-label="github login"
              version="outline"
              size="full"
              // onClick={googleHandler}
            >
              Github <Github />
            </Button>
            <Button
              aria-label="google login"
              version="outline"
              size="full"
              onClick={googleHandler}
            >
              Google <Plus />
            </Button>
          </div>
        </>
      }
    </Form>
  );
};
