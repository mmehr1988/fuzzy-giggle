// ======================================
// EXTERNAL
// ======================================
import { useQuery } from '@apollo/client';
import Row from 'react-bootstrap/Row';

// ======================================
// INTERNAL
// ======================================
import { GET_PROJECTS } from '../../graphql';
import { Loading } from '../Loading';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Loading />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <Row className='gx-3 gy-3'>
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Row>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
