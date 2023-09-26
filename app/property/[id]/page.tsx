"use client";

import { Property } from "@/app/page";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ImageSwiper from "@/components/ImageSwiper";
import { fetchApi } from "../../../libs/fetchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faCircleCheck,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import millify from "millify";

export interface PropertyDetail extends Property {
  photos: {
    url: string;
    id: number;
  }[];
  description: string;
  type: string;
  purpose: string;
  furnishingStatus: string;
  amenities: {
    amenities: {
      text: string;
    }[];
  }[];
}

export default async function PropertyDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const data = await getPropertyDetail(Number(id));
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = data;
  return (
    <Box maxW="1000px" mx="auto" p="4">
      {photos && <ImageSwiper photos={photos} />}
      <Box w="full" p="6">
        <Flex align="center" justify="space-between">
          <HStack spacing="3">
            {isVerified && <FontAwesomeIcon icon={faCircleCheck} size="lg" />}
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </HStack>
          <Avatar size="sm" src={agency?.logo?.url} name={title} />
        </Flex>
        <Flex w="250px" color="blue.500" justify="space-between" align="center">
          {rooms} <FontAwesomeIcon icon={faBed} /> | {baths}{" "}
          <FontAwesomeIcon icon={faBath} /> | {millify(area)} sqft{" "}
          <FontAwesomeIcon icon={faGrip} />
        </Flex>
      </Box>
      <VStack spacing="2" my="2">
        <Heading as="h3" size="lg" noOfLines={1}>
          {title}
        </Heading>
        <Text lineHeight="2" color="gray.600">
          {description}
        </Text>
      </VStack>
      <Wrap textTransform="uppercase" justify="space-between">
        <WrapItem
          display="flex"
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </WrapItem>
        <WrapItem
          display="flex"
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </WrapItem>
      </Wrap>
      {furnishingStatus && (
        <WrapItem
          display="flex"
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Furnishing Status</Text>
          <Text fontWeight="bold">{furnishingStatus}</Text>
        </WrapItem>
      )}
      <Box py="2">
        {amenities?.length && (
          <Text fontSize="2xl" fontWeight="black">
            Facilities
          </Text>
        )}
        <Wrap gap="1">
          {amenities?.map((item) =>
            item?.amenities.map((amenity) => (
              <Text
                key={amenity.text}
                fontWeight="bold"
                color="blue.400"
                fontSize="lg"
                p="2"
                bg="gray.200"
                borderRadius="5"
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Wrap>
      </Box>
    </Box>
  );
}

async function getPropertyDetail(id: number): Promise<PropertyDetail> {
  const data = await fetchApi(
    `/properties/detail?externalID=${id}`,
    "no-store"
  );
  return data;
}
