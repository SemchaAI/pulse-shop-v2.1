'use client';
import toast from 'react-hot-toast';
import { AtSign, Github, KeyRound, Plus, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { FieldInput, Form } from '@/components/entities';
import {
  API_ROUTES,
  emailValidation,
  Min5,
  ReqMin5Max20Validation,
  ROUTES,
} from '@/utils/consts';
import type { IRegistrationForm } from '@/models/forms';
// import { handleCredentialsSignup } from '@/app/(root)/signup/signupAction';
import { Button } from '@/components/shared';
import { credentialsSignup } from '@/utils/api';
import { ApiResponse } from '@/models/auth';
import Link from 'next/link';

export const RegisterForm = () => {
  const form = useForm<IRegistrationForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });
  const submitHandler = async (data: IRegistrationForm) => {
    const { email, name, password } = data;
    try {
      // const response = await handleCredentialsSignup({
      //   email,
      //   name,
      //   password,
      // });
      const response = await credentialsSignup({ email, name, password });
      console.log('response', response);

      toast.success('User created. Please check your email', {
        duration: 30000,
        position: 'top-center',
        icon: '👏',
      });
      // form.reset();
      //router.push('/verification');
    } catch (error) {
      const { message } = error as ApiResponse;
      toast.error(`Auth error. ${message}`);
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
            id="name"
            name="name"
            placeholder="name"
            validation={Min5}
          />
          <FieldInput
            initType="email"
            Icon={AtSign}
            id="email"
            name="email"
            placeholder="email"
            validation={emailValidation}
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
          <FieldInput
            initType="password"
            Icon={KeyRound}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            validation={{
              validate: (value: string) => {
                const formValues = form.getValues();
                if (formValues.password && value !== formValues.password) {
                  return 'Passwords do not match';
                }
                return undefined;
              },
            }}
          />
        </div>
      }
      {
        <>
          <div className="pt-2 pb-4 border-b border-border">
            <div className="flex justify-between typo-body-16 p-2">
              <p>Already have an account?</p>
              <Link
                className="flex gap-1 items-center justify-center text-primary hover:underline focus:underline"
                href={ROUTES.LOGIN}
              >
                Sign in
              </Link>
            </div>
            <Button
              aria-label="sign up"
              type="submit"
              version="outline"
              size="full"
            >
              Sign up
            </Button>
          </div>
          <div className="flex gap-2 pt-5">
            <Button
              aria-label="github sign up"
              version="outline"
              size="full"
              // onClick={googleHandler}
            >
              Github <Github />
            </Button>
            <Button
              aria-label="google sign up"
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
