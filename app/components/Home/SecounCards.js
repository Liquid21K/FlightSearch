import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CardDefault = ({ currentItem, openInformation }) => {
  const handleOpenInformation = (e) => {
    e.preventDefault();
    openInformation(e.target.value);
  };

  return (
    <Card className="mt-6 w-96 h-auto">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={currentItem.image} alt="card-image" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {currentItem.title}
        </Typography>
        <Typography className="whitespace-pre-line h-36">
          {currentItem.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={handleOpenInformation}
          value={currentItem.title}
          className="w-full text-center text-white bg-blue-500"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardDefault;
