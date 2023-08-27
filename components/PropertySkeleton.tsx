"use client";

import {
  Card,
  HStack,
  Skeleton,
  Box,
  CardHeader,
  SkeletonText,
  CardBody,
  SkeletonCircle,
  Flex,
  CardFooter,
} from "@chakra-ui/react";

const PropertySkeleton = ({ propertyLength }: { propertyLength: number }) => {
  const arr: Number[] = new Array(propertyLength).fill(0);

  return (
    <Flex flexWrap="wrap" gap="6">
      {arr.map((_itemm, idx) => (
        <Card w="420px" h="auto" key={idx + 1}>
          <Skeleton>
            <Box width={420} height={260} />
          </Skeleton>
          <CardHeader>
            <SkeletonText skeletonHeight="3" noOfLines={1}></SkeletonText>
          </CardHeader>
          <CardBody>
            <Flex align="center" justify="space-between">
              <HStack spacing="2">
                <SkeletonCircle size="5"></SkeletonCircle>
                <SkeletonText noOfLines={1} skeletonHeight="2"></SkeletonText>
              </HStack>
              <SkeletonCircle size="8"></SkeletonCircle>
            </Flex>
          </CardBody>
          <CardFooter>
            <SkeletonText
              w="full"
              noOfLines={1}
              skeletonHeight="3"
            ></SkeletonText>
          </CardFooter>
        </Card>
      ))}
    </Flex>
  );
};

export default PropertySkeleton;
