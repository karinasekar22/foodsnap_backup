import React from "react";

import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  FoodIntake,
  ChartOption,
} from "./variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";

export default function Analytic(props) {
  const { ...rest } = props;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              color='secondaryGray.600'
              fontSize={{base:"xs", md:"md"}}
              fontWeight='500'
              textAlign="start">
              Estimasi Kandungan Gizi Makro
            </Text>
          </Flex>
          <Flex align='end' >
          <Text
              mr='4px'
              color='secondaryGray.600'
              fontSize={{base:"xs", md:"md"}}
              fontWeight='500'>
              Data dari wishlist: 
            </Text>
            <Text
              color={textColor}
              fontSize={{base:"md", md:"xl"}}
              fontWeight='700'
              lineHeight='100%'>
                 4 Item
            </Text>
          </Flex>
        </Flex>
        <Flex align='center'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            +2.45%
          </Text>
        </Flex>
      </Flex>
      <Box h='315px' mt='auto'>
        <BarChart
          chartData={FoodIntake}
          chartOptions={ChartOption}
        />
      </Box>
    </Card>

  );
}
