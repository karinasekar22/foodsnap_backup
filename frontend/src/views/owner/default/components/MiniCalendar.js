import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Card from "components/card/Card.js";

export default function MiniCalendar(props) {
  const { selectRange, onChange: onChangeProp, ...rest } = props;
  const [value, setValue] = useState(new Date());

  const handleChange = (val) => {
    setValue(val);
    if (onChangeProp) {
      if (selectRange) {
        onChangeProp({ selection: { startDate: val[0], endDate: val[1] } });
      } else {
        onChangeProp({ selection: { startDate: val, endDate: val } });
      }
    }
  };

  return (
    <Card
      align="center"
      direction="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={handleChange}
        value={value}
        selectRange={selectRange}
        view="month"
        tileContent={<Text color="brand.500"></Text>}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
        formatShortWeekday={(locale, date) => {
          const days = ["S", "M", "T", "W", "T", "F", "S"];
          return days[date.getDay()];
        }}
      />
    </Card>
  );
}
