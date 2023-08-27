"use client";

import { atom, useAtomValue, useAtom } from "jotai";
import { atomWithReset, loadable, RESET } from "jotai/utils";
import {
  filterScheme,
  FilterValue,
  getFilterValues,
} from "@/data/filterScheme";
import {
  Select,
  Wrap,
  WrapItem,
  VStack,
  Button,
  Input,
  HStack,
  IconButton,
  Spinner,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchApi } from "@/libs/fetchApi";
import noresult from "../public/noresult.png";

const filterAtom = atom<typeof filterScheme>(filterScheme);
const showLocationsAtom = atom<boolean>(false);
const searchTermAtom = atomWithReset<string>("");
const locationDataAtom = atom(async (get) => {
  const searchTerm = get(searchTermAtom);
  if (searchTerm) {
    const data = await fetchApi(`/auto-complete?query=${searchTerm}`);
    return data?.hits;
  }
  return [];
});
const loadablelocationDataAtom = loadable(locationDataAtom);

const SearchFilter = () => {
  const filters = useAtomValue(filterAtom);
  const [showLocations, setShowLocations] = useAtom(showLocationsAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const locationsData = useAtomValue(loadablelocationDataAtom);
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function searchByFilters(filterValue: Partial<FilterValue>) {
    const values = getFilterValues(filterValue);
    let searchParams = "";
    values.forEach((item) => {
      if (item.value && filterValue?.[item.name as keyof FilterValue]) {
        searchParams = createQueryString(item.name, item.value);
      }
    });
    router.push(pathName + "?" + searchParams);
  }

  return (
    <Wrap justify="center" spacing="4" bg="gray.100">
      {filters.map((filter) => (
        <WrapItem key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) =>
              searchByFilters({ [filter.queryName]: e.target.value })
            }
          >
            {filter.items.map((item) => (
              <option value={item.value} key={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        </WrapItem>
      ))}
      <WrapItem placeItems="center" flexBasis="50%" py="2">
        <HStack justify="space-between" align="start">
          <Button
            p="2"
            border="1px"
            borderColor="gray.200"
            onClick={() => setShowLocations(!showLocations)}
          >
            Search Location
          </Button>
          {showLocations && (
            <VStack position="relative">
              <Input
                placeholder="Type here"
                value={searchTerm}
                w="300px"
                focusBorderColor="gray.300"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <IconButton
                  position="absolute"
                  cursor="pointer"
                  right="2"
                  top="-1"
                  zIndex="20"
                  size="sm"
                  aria-label="reset search term"
                  onClick={() => setSearchTerm(RESET)}
                  icon={<FontAwesomeIcon icon={faRectangleXmark} />}
                />
              )}
              {locationsData.state === "loading" && (
                <Spinner placeItems="center" />
              )}
              <Box h="300px" overflow="auto">
                {locationsData.state === "hasData" &&
                  locationsData.data?.map(
                    (location: {
                      id: number;
                      externalID: string;
                      name: string;
                    }) => (
                      <Box
                        key={location.id}
                        onClick={() => {
                          searchByFilters({
                            locationExternalIDs: location.externalID,
                          });
                          setShowLocations(false);
                          setSearchTerm(location.name);
                        }}
                      >
                        <Text
                          cursor="pointer"
                          bg="gray.200"
                          p="2"
                          borderBottom="1px"
                          borderColor="gray.100"
                        >
                          {location.name}
                        </Text>
                      </Box>
                    )
                  )}
              </Box>
              {(locationsData.state === "hasError" ||
                (locationsData.state === "hasData" && !locationsData.data)) && (
                <Center gap="3" flexDirection="column">
                  <Image
                    src={noresult}
                    alt="no-result image"
                    style={{ borderRadius: "100%" }}
                  />
                  <Text fontSize="xl">No search result</Text>
                </Center>
              )}
            </VStack>
          )}
        </HStack>
      </WrapItem>
    </Wrap>
  );
};

export default SearchFilter;
