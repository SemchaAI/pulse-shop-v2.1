export const required = {
  required: {
    value: true,
    message: 'Obligatory field',
  },
};
export const Min5 = {
  ...required,
  minLength: {
    value: 5,
    message: 'Minimum length 5',
  },
};
export const Min3 = {
  ...required,
  minLength: {
    value: 3,
    message: 'Minimum length 3',
  },
};

export const emailValidation = {
  ...required,
  pattern: {
    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: 'Incorrect mail',
  },
};

export const ReqMin5Max20Validation = {
  ...required,
  ...Min5,
  maxLength: {
    value: 20,
    message: 'Maximal length 20',
  },
};
export const ReqMin3Max10Validation = {
  ...required,
  ...Min3,
  maxLength: {
    value: 10,
    message: 'Length range from 3 to 10 characters',
  },
};
export const PhoneValidation = {
  ...required,
  minLength: {
    value: 16,
    message: 'Minimum length 9',
  },
  maxLength: {
    value: 16,
    message: 'Maximal length 9',
  },
};

type ValidationFunction = (value: string) => string | undefined;
interface validate {
  validate: ValidationFunction;
}

export type ValidationTypes =
  | null
  | typeof required
  | typeof Min5
  | typeof Min3
  | typeof emailValidation
  | typeof ReqMin5Max20Validation
  | typeof ReqMin3Max10Validation
  | validate;
