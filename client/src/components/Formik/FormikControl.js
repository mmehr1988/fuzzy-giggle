import { FormInput, FormTextArea, FormSelect } from '../Forms/FormComponents';

function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <FormInput {...rest} />;
    case 'textarea':
      return <FormTextArea {...rest} />;
    case 'select':
      return <FormSelect {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
