import React from "react";
import LayoutCustomer from "../LayoutCustomer";
import WishlistCard from "./components/WishlistCard";
import Analytic from "./components/Analytical";
import Calendar from "./components/Calendar";
import { HStack, VStack} from "@chakra-ui/react";
import PieCharts from "./components/PieCharts";
import RecipeList from "./components/RecipeList";

const analyticalPage = () => {
    return(
        <LayoutCustomer>
            <WishlistCard />
             <HStack justify="space-between" w="100%" p={2}>
                <VStack w="100%">
                <Analytic /> 
                <PieCharts />
                </VStack>
                <VStack>
                <Calendar />
                <RecipeList />
                </VStack>
             </HStack>
            
        </LayoutCustomer>
    );
};

export default analyticalPage;