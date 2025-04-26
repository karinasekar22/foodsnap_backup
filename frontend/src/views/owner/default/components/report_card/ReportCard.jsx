import { VStack, Box, Icon, Select, HStack } from '@chakra-ui/react';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import StaticMini from './StaticMini';
import IconBox from './IconBox';
import ReportSlider from './ReportSlider';
import {
  MdCamera,
  MdMenuBook,
  MdRecommend,
  MdRestaurant,
  MdStar,
} from 'react-icons/md';

const ReportCard = () => {
  const brandColor = 'green.300';
  const boxBg = 'secondaryGray.300';
  return (
    <Box pt={{ base: '180px', md: '120px', xl: '120px' }}>
      <VStack align="flex-start" w="full">
        <Select
          fontSize="sm"
          variant="subtle"
          defaultValue="monthly"
          width="unset"
          fontWeight="700"
        >
          <option value="all">All Restaurant</option>
          <option value="restaurant-1">Warung Sederhana</option>
          <option value="restaurant-2">Warung Tidak Sederhana</option>
        </Select>
        <ReportSlider>
          <Box
            pt="8px"
            minW="250px"
            overflow="hidden"
            transition="transform 0.3s"
            py={4}
          >
            <HStack>
            <StaticMini
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={MdCamera} color={brandColor} />
                  }
                />
              }
              name="Total Snap"
              value="100"
            />
            <StaticMini
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={FaHeart} color={brandColor} />
                  }
                />
              }
              name="Total Wishlisht"
              value="112K"
            />
            <StaticMini
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={brandColor}
                  icon={
                    <Icon w="28px" h="28px" as={MdRecommend} color="white" />
                  }
                />
              }
              name="Total Rekomendasi"
              value="49K"
            />
            <StaticMini
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={brandColor}
                  icon={<Icon w="28px" h="28px" as={MdStar} color="white" />}
                />
              }
              name="Average Rating"
              value="4,9"
            />
            <StaticMini
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={brandColor}
                  icon={
                    <Icon w="28px" h="28px" as={MdMenuBook} color="white" />
                  }
                />
              }
              name="Total Menu Aktif"
              value="154"
            />
            <StaticMini
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdRestaurant}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Restaurant"
              value="2"
            />
            </HStack>
          </Box>
        </ReportSlider>
      </VStack>
    </Box>
  );
};

export default ReportCard;
