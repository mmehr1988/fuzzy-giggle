import * as yup from 'yup';

export const ClientFormInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export const ClientFormSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: yup.string().required('Phone number is required'),
});

export const ClientFormStructure = [
  {
    id: 'app__addClientForm-firstName',
    type: 'text',
    name: 'firstName',
    placeholder: 'John',
  },
  {
    id: 'app__addClientForm-lastName',
    type: 'text',
    name: 'lastName',
    placeholder: 'Doe',
  },
  {
    id: 'app__addClientForm-email',
    type: 'email',
    name: 'email',
    placeholder: 'email@example.com',
  },
  {
    id: 'app__addClientForm-phone',
    type: 'text',
    name: 'phone',
    placeholder: 'xxx-xxx-xxxx',
  },
];
