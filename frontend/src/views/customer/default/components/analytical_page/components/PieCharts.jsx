import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  HStack,
  VStack,
} from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { VSeparator } from "components/separator/Separator";
import { pieChartData, pieChartOptions } from "./variables/charts";

export default function PieCharts(props) {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card p="20px" align="start" direction="column" w="100%" {...props}>
      <HStack align="start" spacing={4} w="100%" direction={{base: "column", md:"row"}} flexWrap="wrap">
        <VStack flex={1} align="center">
        <Text color={textColor} fontSize="md" fontWeight="600" mt="4px" ml={3} alignSelf="flex-start">
          Category Based
        </Text>
        <Box>
      <PieChart
        width = {250}
        height = {250}
        chartData={pieChartData}
        chartOptions={pieChartOptions}
      />
      </Box>
        </VStack>
        <VStack flex={2} align="start">
        <Card
        bg={cardColor}
        direction="row"
        boxShadow={cardShadow}
        w="100%"
        p="5px"
        px="20px"
        mt="15px"
        mx="auto"
      >
        <HStack spacing={4} w="100%">
        <Box flex={1}>
        <LegendItem
          color="#23673c"
          label="Main Course"
          value="7%"
          textColor={textColor}
        />
        <LegendItem
          color="#32753e"
          label="Dessert"
          value="13%"
          textColor={textColor}
        />
         <LegendItem
          color="#82ae3b"
          label="Junk Food"
          value="22%"
          textColor={textColor}
        />
        </Box>
        <VSeparator/>
        <Box flex={1}>
        <LegendItem
          color="#9bbb39"
          label="Sea Food"
          value="31%"
          textColor={textColor}
        />
         <LegendItem
          color="#b6c836"
          label="Coffe"
          value="11%"
          textColor={textColor}
        />
        <LegendItem
          color="#f2df36"
          label="Soft Drink"
          value="16%"
          textColor={textColor}
        />
        </Box>
        </HStack>
      </Card>
        </VStack>
      </HStack>
    </Card>
  );
}

// Subkomponen LegendItem agar lebih modular
const LegendItem = ({ color, label, value, textColor }) => (
  <Flex direction="column" py="5px">
    <Flex align="center">
      <Box h="8px" w="8px" bg={color} borderRadius="50%" me="4px" />
      <Text fontSize="xs" color="secondaryGray.600" fontWeight="700" mb="5px">
        {label}
      </Text>
    </Flex>
    <Text fontSize="lg" color={textColor} fontWeight="700">
      {value}
    </Text>
  </Flex>
);
