import Button from 'react-bootstrap/Button';

const ViewProjectButton = (props) => {
  const { projectId } = props;

  return (
    <Button href={`/project/${projectId}`} variant='light'>
      View
    </Button>
  );
};

export default ViewProjectButton;
