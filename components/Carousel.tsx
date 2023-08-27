"use client";

import { Box, Flex, IconButton } from "@chakra-ui/react";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { atom, useAtom } from "jotai";
import React, { ReactNode, useMemo } from "react";
import { useSwipeable } from "react-swipeable";

type Direction = "PREV" | "NEXT";

interface CarouselState {
  pos: number;
  sliding: boolean;
  dir: Direction;
}

type CarouselAction =
  | { type: Direction; numItems: number }
  | { type: "stopSliding" };

const carouselAtomWithNum = (numItems: number) =>
  atom<CarouselState>({ pos: numItems - 1, sliding: false, dir: "NEXT" });

const deriveCarouselAtom = (
  carouselAtom: ReturnType<typeof carouselAtomWithNum>
) =>
  atom(
    (get) => get(carouselAtom),
    (get, set, action: CarouselAction) => {
      const state = get(carouselAtom);
      if (action.type === "PREV") {
        set(carouselAtom, {
          ...state,
          dir: "PREV",
          sliding: true,
          pos: state.pos === 0 ? action.numItems - 1 : state.pos - 1,
        });
      } else if (action.type === "NEXT") {
        set(carouselAtom, {
          ...state,
          dir: "NEXT",
          sliding: true,
          pos: state.pos === action.numItems - 1 ? 0 : state.pos + 1,
        });
      } else {
        set(carouselAtom, {
          ...state,
          sliding: false,
        });
      }
    }
  );

const getOrder = (index: number, pos: number, numItems: number) => {
  return index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
};

const CarouselContainer = ({
  sliding,
  dir,
  children,
}: {
  sliding: boolean;
  dir: string;
  children: ReactNode;
}) => {
  return (
    <Flex
      placeItems="center"
      transition={sliding ? "none" : "transform 1s ease"}
      sx={{
        transform: () => {
          if (!sliding) return "translateX(calc(-100% - 16px))";
          if (dir === "PREV") return "translateX(calc(2 * (-100% -16px)))";
          return "translateX(0%)";
        },
      }}
    >
      {children}
    </Flex>
  );
};

const RightArrow = ({ slide }: { slide: (dir: Direction) => void }) => {
  return (
    <Flex>
      <IconButton
        aria-label="swipe right"
        icon={<FontAwesomeIcon icon={faCircleChevronRight} />}
        fontSize="2xl"
        onClick={() => slide("NEXT")}
      />
    </Flex>
  );
};

const LeftArrow = ({ slide }: { slide: (direction: Direction) => void }) => {
  return (
    <Flex>
      <IconButton
        aria-label="swipe left"
        icon={<FontAwesomeIcon icon={faCircleChevronLeft} />}
        fontSize="2xl"
        onClick={() => slide("PREV")}
      />
    </Flex>
  );
};

const Carousel = ({ children }: { children: ReactNode }) => {
  const numItems = React.Children.count(children);
  const getAtomWithNum = useMemo(
    () => carouselAtomWithNum(numItems),
    [numItems]
  );
  const carouselAtomMemo = useMemo(
    () => deriveCarouselAtom(getAtomWithNum),
    [getAtomWithNum]
  );
  const [state, dispatch] = useAtom(carouselAtomMemo);

  const slide = (dir: Direction) => {
    dispatch({ type: dir, numItems });
    setTimeout(() => {
      dispatch({ type: "stopSliding" });
    }, 50);
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwipedLeft: () => slide("NEXT"),
    onSwipedRight: () => slide("PREV"),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <Box
      {...handlers}
      style={{ touchAction: "pan-y" }}
      position="relative"
      placeItems="center"
    >
      <Box p="2" maxWidth="910px" overflow="hidden" boxShadow="xl" mx="auto">
        <CarouselContainer dir={state.dir} sliding={state.sliding}>
          {React.Children.map(children, (child, index) => (
            <Box
              flex="1 0 100%"
              flexBasis="100%"
              mr="4"
              order={getOrder(index, state.pos, numItems)}
              key={index}
            >
              {child}
            </Box>
          ))}
        </CarouselContainer>
      </Box>
      <Flex
        px="4"
        w="full"
        justify="space-between"
        position="absolute"
        top="calc(50% - 40px/2)"
      >
        <LeftArrow slide={slide} />
        <RightArrow slide={slide} />
      </Flex>
    </Box>
  );
};

export default Carousel;
