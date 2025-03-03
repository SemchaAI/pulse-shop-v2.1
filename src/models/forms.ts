export interface IRegistrationForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ILoginForm {
  emailOrName: string;
  password: string;
}
export interface IUserForm {
  name: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string;
}
export interface ICheckoutForm extends IUserForm {
  address: string;
  textarea?: string;

  firstName: string;
  lastName: string;
  phone: string;
}
