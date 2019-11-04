import fetch from 'isomorphic-unfetch';

function Projects({ projects }) {
  return (
    <div>
      <h1>Projects page</h1>
      <div>{projects}</div>
    </div>
  );
}

Projects.getInitialProps = async ({ req }) => {
  let URL;

  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'production') {
      URL = `https://${req.headers.host}/api/get-projects`;
    } else {
      URL = `https://localhost:3000/api/get-projects`;
    }
  } else {
    URL = '/api/get-projects';
  }

  const props = { projects: [] };

  try {
    const response = await fetch(URL);
    const { docs } = await response.json();

    props.projects = docs;
  } catch (e) {
    console.error(e.message);
  }
  return props;
};

export default Projects;
