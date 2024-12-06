import { PetCalendar } from "@/components/PetCalendar";
import { calendarStyle } from "@/components/styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarScreen() {
  return (
    <SafeAreaView style={calendarStyle.calendar}>
      <PetCalendar></PetCalendar>
    </SafeAreaView>
  );
}
