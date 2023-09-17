'use client'
import { Tab, Tabs } from "@nextui-org/react";
import Data_table from "./table/data-table";
import { Schedule } from "@/types/types";
import CustomCalendar from "./components/CustomCalendar";

interface ClientpageProps {
    data: Schedule[]
}
 
const Clientpage: React.FC<ClientpageProps> = ({data}) => {
    
    return (
      <Tabs aria-label="Schedules">
        <Tab key="subject" title="Subjects">
          <Data_table sched={data} />
        </Tab>
        <Tab key="weekLy" title="Weekly">
          <CustomCalendar sched={data} />
        </Tab>
      </Tabs>
    )
}

export default Clientpage;