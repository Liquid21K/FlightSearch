import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
} from "@heroui/react";
import CarouselData from "./CarouselData";

const InformationCard = ({ show }) => {
  const c = CarouselData();
  const card = c.find((item) => item.title === show);

  if (!card) {
    return <p>No information found for: {show}</p>;
  }

  return (
    <div className="flex justify-center mt-32 ">
      <Card className="w-[70%] shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <CardHeader className="relative w-full h-64 rounded-t-lg overflow-hidden">
          <Image
            src={card.image}
            alt={card.title}
            className="object-cover w-full h-full"
            style={{ zIndex: 0 }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-10">
            <h5 className="text-white text-3xl font-bold text-center">
              {card.title}
            </h5>
            <p className="text-sm text-gray-300">{card.country}</p>
          </div>
        </CardHeader>

        {/* Centered Tabs */}
        <CardBody className="p-6 max-h-[480px] overflow-auto">
          <Tabs
            aria-label="Options"
            isVertical={true}
            classNames={{
              tabList: "flex justify-center items-center", // Center tab list
              tabContent: "w-full flex justify-center",    // Center tab content
            }}
          >
            <Tab key="popularity" title="Popularity">
              <Card>
                <CardBody>
                  <p>
                    <strong>Popularity:</strong> {card.popularity || "N/A"}
                  </p>
                  <p>
                    <strong>Score:</strong> {card.score || "N/A"}
                  </p>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="information" title="Information">
              <Card>
                <CardBody>
                  <p>{card.information || "No information available."}</p>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="chatgpt" title="ChatGPT">
              <Card>
                <CardBody>
                  <p>
                    <strong>Must-See Attractions:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 mb-4">
                    {card.mustSeeAttractions && card.mustSeeAttractions.length > 0 ? (
                      card.mustSeeAttractions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>

                  <p>
                    <strong>Local Tips:</strong> {card.localTips || "N/A"}
                  </p>

                  {card.coordinates && (
                    <p className="mt-4">
                      <strong>Coordinates:</strong> Lat {card.coordinates.lat}, Lng{" "}
                      {card.coordinates.lng}
                    </p>
                  )}
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>

        <CardFooter className="flex justify-end p-4">
          {/* Optional footer actions */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default InformationCard;
