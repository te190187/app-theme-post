import { Carousel } from "@mantine/carousel";
import { Box, Flex } from "@mantine/core";
import { Theme } from "../../../server/models/theme";
import { PopularThemeCard, popularThemeCardWidthPx } from "./PopularThemeCard";

type Props = { themes: Theme[] | undefined; miw?: string };
export const PopularThemeCarousel: React.FC<Props> = ({ themes, miw }) => {
  return (
    <Carousel
      align="center"
      loop
      slideSize={`${popularThemeCardWidthPx}px`}
      miw={miw}
      slideGap="md"
      bg="red.7"
      withIndicators
      height={250}
      dragFree
      styles={{
        indicators: { bottom: "10px" },
      }}
      sx={(theme) => ({
        borderRadius: theme.radius.lg,
        boxShadow: `inset ${theme.shadows.lg}`,
      })}
      nextControlLabel="次のお題に進める"
      previousControlLabel="前のお題に戻る"
    >
      {themes && themes.length > 0 ? (
        themes.map((theme) => (
          <Carousel.Slide key={theme.id}>
            <Flex h="100%" w={`${popularThemeCardWidthPx}px`} align="center">
              <Box w="100%" h="80%">
                <PopularThemeCard theme={theme} />
              </Box>
            </Flex>
          </Carousel.Slide>
        ))
      ) : (
        <Box></Box>
      )}
    </Carousel>
  );
};
