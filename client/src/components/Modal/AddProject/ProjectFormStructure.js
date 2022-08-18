import * as yup from 'yup';

export const ProjectFormInitialValues = {
  name: '',
  status: 'new',
  description: '',
  clientId: '',
};

export const ProjectFormSchema = yup.object().shape({
  name: yup.string().required('Project name is required'),
  status: yup.string(),
  description: yup.string(),
  clientId: yup.string().required('Client is required'),
});

export const FormStatusOptionsArray = [
  { id: 'new', text: 'Not Started' },
  { id: 'progress', text: 'In Progress' },
  { id: 'completed', text: 'Completed' },
];

export const ProjectFormStructure = [
  {
    id: 'app__addProjectForm-name',
    type: 'text',
    name: 'name',
    as: 'input',
  },
  {
    id: 'app__addProjectForm-description',
    type: 'text',
    name: 'description',
    as: 'textarea',
  },
  {
    id: 'app__addProjectForm-status',
    name: 'status',
    as: 'select',
    options: FormStatusOptionsArray,
  },
  {
    id: 'app__addProjectForm-client',
    label: 'Client',
    name: 'clientId',
    as: 'select',
    options: [{ id: 'default', text: 'Please select a client' }],
  },
];
