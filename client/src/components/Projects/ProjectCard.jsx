// ======================================
// EXTERNAL
// ======================================
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// ======================================
// INTERNAL
// ======================================

import { ViewProjectButton } from '../Button';

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <Col lg={4} md={6}>
      <Card>
        <Card.Body className='d-flex justify-content-between align-items-center pb-1 pt-3'>
          <Card.Title>{project.name}</Card.Title>
          <ViewProjectButton projectId={project.id} />
        </Card.Body>
        <Card.Body className='pb-3 pt-1'>
          <Card.Text>
            Status: <strong>{project.status}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectCard;
