import { Mail, Phone, User } from 'lucide-react';
import { emailValidation, Min5, PhoneValidation } from './validationObjects';

export const fields = [
  {
    id: 'firstName',
    label: 'First Name',
    placeholder: 'First Name',
    autoComplete: 'given-name',
    validation: Min5,
    myType: 'text' as const,
    icon: User,
  },
  {
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Last Name',
    autoComplete: 'family-name',
    validation: Min5,
    myType: 'text' as const,
    icon: User,
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Email',
    autoComplete: 'email',
    validation: emailValidation,
    myType: 'email' as const,
    icon: Mail,
  },
  {
    id: 'phone',
    label: 'Phone',
    placeholder: '+9 (99) 99-99-99',
    autoComplete: 'tel',
    validation: PhoneValidation,
    myType: 'text' as const,
    icon: Phone,
    mask: '+9 (99) 99-99-99',
  },
];
