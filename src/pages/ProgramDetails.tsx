import { useParams } from 'react-router-dom';

const ProgramDetails = () => {
  const { programTitle } = useParams();

  // In a real application, you would fetch the program details based on the title
  // For this example, we'll just display the title.

  return (
    <div className="container mx-auto px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-bold text-white">{programTitle}</h1>
      <p className="text-lg text-muted-foreground mt-4">
        Detailed information about the {programTitle} program will go here.
      </p>
    </div>
  );
};

export default ProgramDetails;
