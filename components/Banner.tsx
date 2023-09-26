"use client";

import { Link } from "@chakra-ui/next-js";
import Image from "next/image";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

export type BannerProps = {
  imageUrl: string;
  purpose: string;
  title1: string;
  title2: string;
  desc1: string;
  desc2: string;
  linkName: string;
  buttonText: string;
};

const Banner = ({
  imageUrl,
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  buttonText,
}: BannerProps) => {
  return (
    <Flex wrap="wrap" gap="5" justify="center" align="center" m="10">
      <Image
        src={imageUrl}
        alt=""
        width={500}
        height={300}
        style={{ width: "auto", height: "auto" }}
        priority
      />
      <Box>
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1}
          <br />
          {title2}
        </Text>
        <Text fontSize="lg" py="3" color="gray.700">
          {desc1}
          <br />
          {desc2}
        </Text>
        <Button
          fontSize="xl"
          colorScheme="blue"
          color="white"
          as={Link}
          href={linkName}
        >
          {buttonText}
        </Button>
      </Box>
    </Flex>
  );
};
export default Banner;
