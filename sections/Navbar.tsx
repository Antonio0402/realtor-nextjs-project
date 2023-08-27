"use client";

import {
  Flex,
  Heading,
  Spacer,
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faAddressCard,
  faKey,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <Flex p="2" borderBottom="1px" borderColor="gray.100" align="center">
      <Link href="/" style={{ textDecorationLine: "none" }}>
        <Heading as="h1" px="2" size="3xl" color="blue.400">
          Realtor
        </Heading>
      </Link>
      <Spacer />
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FontAwesomeIcon icon={faBars} />}
            aria-label="Home button"
            variant="outline"
          />
          <MenuList>
            <Link href="/">
              <MenuItem icon={<FontAwesomeIcon icon={faHouse} />}>
                Home
              </MenuItem>
            </Link>
            <Link href="/search">
              {" "}
              <MenuItem icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}>
                Search
              </MenuItem>
            </Link>
            <Link href="/search?purpose=for-sale">
              <MenuItem icon={<FontAwesomeIcon icon={faAddressCard} />}>
                Buy Property
              </MenuItem>
            </Link>
            <Link href="/search?purpose=for-rent">
              <MenuItem icon={<FontAwesomeIcon icon={faKey} />}>
                Rent Property
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;
