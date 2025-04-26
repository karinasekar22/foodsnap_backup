import React from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import { Box } from "@chakra-ui/react";

const Calendar = () => {
    return (
        <Box maxW="300px" h="auto">
            <MiniCalendar selectRange={true}/>
        </Box>
    );

}
export default Calendar;