"use client";

import PropertySkeleton from "@/components/PropertySkeleton";
import { Center, Text, Box, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <Box>
      <Center
        gap="2"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        py="2"
        fontWeight="black"
        fontSize="lg"
        cursor="pointer"
      >
        <Text>Search Property By Filters</Text>
        <FontAwesomeIcon icon={faFilter} size="lg" />
      </Center>
      <Heading as="h3" size="2xl" p="4">
        Properties
      </Heading>
      <PropertySkeleton propertyLength={6} />
    </Box>
  );
}
