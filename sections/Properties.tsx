"use client";

import { Wrap, WrapItem } from "@chakra-ui/react";
import Property from "@/components/Property";
import type { Property as PropertyProps } from "@/app/page";
const Properties = ({ properties }: { properties: PropertyProps[] }) => {
  return (
    <Wrap spacing="6" justify="center" paddingBlock={4}>
      {properties?.map((property: PropertyProps) => (
        <WrapItem key={property.id}>
          <Property property={property} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Properties;
