"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, Container } from "@chakra-ui/react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Container
          minHeight="100vh"
          display="grid"
          gridTemplateRows="auto 1fr auto"
          gap="6"
          maxW="1440px"
          fontFamily="Eudoxus-Sans, sans-serif"
        >
          {children}
        </Container>
      </ChakraProvider>
    </CacheProvider>
  );
}
