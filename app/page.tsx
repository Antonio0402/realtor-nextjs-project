import Banner from "@/components/Banner";
import PropertySkeleton from "@/components/PropertySkeleton";
import Properties from "@/sections/Properties";
import { fetchApi } from "@/libs/fetchApi";
import { Suspense } from "react";

export interface Property {
  id: number;
  coverPhoto?: {
    url?: string;
  };
  price: number;
  rentFrequency: string;
  rooms: number;
  title: string;
  baths: number;
  area: number;
  agency?: {
    logo?: {
      url: string;
    };
  };
  isVerified: boolean;
  externalID: string;
}

export default async function Home() {
  const allProperty = await getAllProperty();
  return (
    <>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore from Apartments, builder floors, villas"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Suspense fallback={<PropertySkeleton propertyLength={6} />}>
        <Properties properties={allProperty.propertyForRent} />
      </Suspense>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore from Apartments, land, builder floors,"
        desc2="villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Suspense fallback={<PropertySkeleton propertyLength={6} />}>
        <Properties properties={allProperty.propertyForSale} />
      </Suspense>
    </>
  );
}

export async function getAllProperty(): Promise<{
  propertyForSale: Property[];
  propertyForRent: Property[];
}> {
  const propertyForSale = fetchApi(
    "/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6",
    "default"
  );
  const propertyForRent = fetchApi(
    "/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6",
    "default"
  );

  const [forSale, forRent] = await Promise.all([
    propertyForSale,
    propertyForRent,
  ]);
  return {
    propertyForSale: forSale?.hits,
    propertyForRent: forRent?.hits,
  };
}
