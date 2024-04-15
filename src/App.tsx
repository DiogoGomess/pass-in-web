import { Header } from "./components/Header";
import { AttendeeList } from "./components/attendee-list";

export function App(){
  return(
    <div className="max-w-[1216px] mx-auto py-5 px-8">
     <Header />
      <AttendeeList/>
    </div>
  )
}