'use client';
import toast from 'react-hot-toast';
import { Mail, Phone, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { FieldInput, Form } from '@/components/entities';
import { Min5, queryKeys } from '@/utils/consts';
import type { IUserForm } from '@/models/forms';
import { queryClient } from '@/utils/queryClient';
import { Button } from '@/components/shared';
import {
  emailValidation,
  PhoneValidation,
  ReqMin3Max10Validation,
} from '@/utils/consts/validationObjects';
import { updateUserInfo } from '@/utils/api/http/userApi';

interface IProps {
  user: IUserForm | null;
}

export const PersonalDataForm = ({ user }: IProps) => {
  // const router = useRouter();
  const form = useForm<IUserForm>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      name: user?.name || '',
      phone: user?.phone || '',
    },
    mode: 'onBlur',
  });
  const submitHandler = async (data: IUserForm) => {
    console.log('data', data);
    try {
      const response = await updateUserInfo(data);
      toast.success(`${response.message}`, {
        duration: 3000,
        position: 'top-center',
        icon: '👏',
      });
      queryClient.invalidateQueries({ queryKey: [queryKeys.session] });
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
            id="name"
            name="name"
            placeholder="Nickname"
            validation={Min5}
          />
          <FieldInput
            initType="text"
            Icon={User}
            id="firstName"
            name="firstName"
            placeholder="First name"
            validation={ReqMin3Max10Validation}
          />
          <FieldInput
            initType="text"
            Icon={User}
            id="lastName"
            name="lastName"
            placeholder="Last name"
            validation={ReqMin3Max10Validation}
          />
          <FieldInput
            initType="text"
            Icon={Mail}
            id="email"
            name="email"
            placeholder="Email"
            validation={emailValidation}
          />
          <FieldInput
            initType="text"
            Icon={Phone}
            id="phone"
            name="phone"
            placeholder="+9 (99) 99-99-99"
            validation={PhoneValidation}
            mask="+9 (99) 99-99-99"
          />
        </div>
      }
      {
        <Button
          aria-label="submit personal data"
          type="submit"
          version="outline"
          size="full"
        >
          Update personal data
        </Button>
      }
    </Form>
  );
};
