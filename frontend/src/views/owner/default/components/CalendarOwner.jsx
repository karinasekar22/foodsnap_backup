import MiniCalendar from './MiniCalendar';
import { Box } from '@chakra-ui/react';

const Calendar = ({ dateRange, setDateRange }) => {
  const handleDateRangeChange = (range) => {
    setDateRange({
      startDate: range.selection.startDate,
      endDate: range.selection.endDate,
    });
  };

  return (
    <Box maxW="300px" h="auto">
      <MiniCalendar selectRange={true} onChange={handleDateRangeChange} />
    </Box>
  );
};

export default Calendar;
