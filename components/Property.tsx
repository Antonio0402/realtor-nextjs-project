"use client";

import type { Property as PropertyProps } from "@/app/page";
import { Link } from "@chakra-ui/next-js";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Flex,
  Text,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faBed,
  faBath,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import millify from "millify";

const Property = ({
  property: {
    id,
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}: {
  property: PropertyProps;
}) => {
  return (
    <Link href={`/property/${externalID}`} style={{ textDecoration: "none" }}>
      <Card overflow="hidden" maxW="420px" cursor="pointer">
        <Image
          src={coverPhoto ? coverPhoto.url! : "/house.png"}
          width={420}
          height={260}
          alt={`house-${id}`}
          style={{ width: "auto", height: "auto" }}
        />
        <CardHeader>
          {" "}
          <Heading as="h3" size="sm" noOfLines={1}>
            {title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex align="center" justify="space-between">
            <HStack spacing="2">
              {isVerified && <FontAwesomeIcon icon={faCircleCheck} size="lg" />}
              <Text>
                AED {millify(price)}
                {rentFrequency && `/${rentFrequency}`}
              </Text>
            </HStack>
            <Avatar size="sm" src={agency?.logo?.url} name={title} />
          </Flex>
        </CardBody>
        <CardFooter display="grid" gap="2">
          <Flex
            w="250px"
            color="blue.500"
            justify="space-between"
            align="center"
          >
            {rooms} <FontAwesomeIcon icon={faBed} /> | {baths}{" "}
            <FontAwesomeIcon icon={faBath} /> | {millify(area)} sqft{" "}
            <FontAwesomeIcon icon={faGrip} />
          </Flex>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Property;
