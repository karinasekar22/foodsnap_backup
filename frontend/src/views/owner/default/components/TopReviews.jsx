import { StarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

const columnHelper = createColumnHelper();

const RatingColumn = ({ value }) => (
  <Flex align="center">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        color={i < Math.floor(value || 4) ? 'yellow.400' : 'gray.300'}
      />
    ))}
  </Flex>
);

const RepliesColumn = ({ value }) => (
  <Text
    color="gray.600"
    fontSize="sm"
    fontWeight="500"
    justifyContent="space-between"
    align="center"
  >
    {value}
  </Text>
);

const NameColumn = ({ value }) => (
  <Flex align="center">
    <Avatar src={value[1]} w="30px" h="30px" me="8px" />
    <Text color="gray.800" fontSize="sm" fontWeight="600">
      {value[0]}
    </Text>
  </Flex>
);

const TopReviews = ({ tableData }) => {
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          NAME
        </Text>
      ),
      cell: (info) => <NameColumn value={info.getValue()} />,
    }),
    columnHelper.accessor('replies', {
      id: 'replies',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          REPLIES
        </Text>
      ),
      cell: (info) => <RepliesColumn value={info.getValue()} />,
    }),
    columnHelper.accessor('rating', {
      id: 'rating',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          RATING
        </Text>
      ),
      cell: (info) => <RatingColumn value={info.getValue()} />,
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Flex
      direction="column"
      w="100%"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
      bg="white"
      borderRadius="xl"
    >
      <Flex
        align={{ sm: 'flex-start', lg: 'center' }}
        justify="space-between"
        w="100%"
        pt="15px"
        px="22px"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600">
          Top 3 Reviews
        </Text>
        <Button variant="action">See all</Button>
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '',
                        desc: '',
                      }[header.column.getIsSorted()] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.slice(0, 11).map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                    borderColor="transparent"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default TopReviews;
