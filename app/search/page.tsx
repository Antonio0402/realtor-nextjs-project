"use client";

import { Box, Text, Center, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import noresult from "../../public/noresult.png";

import { fetchApi } from "@/libs/fetchApi";
import { makeQueryClient } from "@/libs/queryClient";
import Property from "@/components/Property";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { atom, useAtom } from "jotai";
import { use } from "react";
import { Property as PropertyProps } from "../page";

const queryClient = makeQueryClient();
const searchFiltersAtom = atom<boolean>(false);

const SearchFilter = dynamic(() => import("@/components/SearchFilter"));

export default function SearchFilters() {
  const [searchFilters, setSearchFilters] = useAtom(searchFiltersAtom);
  const params = useSearchParams();
  const purpose = params.get("purpose");

  const properties = use(
    queryClient(
      ["properties", params.toString()].join("-"),
      async () => await getSearchFilterResults(params)
    )
  );

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
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <Text>Search Property By Filters</Text>
        <FontAwesomeIcon icon={faFilter} size="lg" />
      </Center>
      {searchFilters && <SearchFilter />}
      <Heading as="h3" size="2xl" p="4">
        Properties {purpose}
      </Heading>
      <Wrap>
        {properties?.map((property: PropertyProps) => (
          <WrapItem key={property.id}>
            <Property property={property} />
          </WrapItem>
        ))}
      </Wrap>
      {!properties?.length && (
        <Center gap="3" my="5" flexDirection="column">
          <Image
            src={noresult}
            alt="no-result image"
            style={{ borderRadius: "100%", width: "auto", height: "auto" }}
          />
          <Text fontSize="xl">No Result Found.</Text>
        </Center>
      )}
    </Box>
  );
}

async function getSearchFilterResults(
  query: ReadonlyURLSearchParams
): Promise<PropertyProps[]> {
  const purpose = query.get("purpose") || "for-rent";
  const rentFrequency = query.get("rentFrequency") || "yearly";
  const minPrice = query.get("minPrice") || "0";
  const maxPrice = query.get("maxPrice") || "1000000";
  const roomsMin = query.get("roomsMin") || "0";
  const bathsMin = query.get("bathsMin") || "0";
  const sort = query.get("sort") || "price-desc";
  const areaMax = query.get("areaMax") || "3500";
  const locationExternalIDs = query.get("locationExternalIDs") || "5002";
  const categoryExternalID = query.get("categoryExternalID") || "4";

  const data = await fetchApi(
    `/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`,
    "no-store"
  );

  return data?.hits;
}
