import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: todaysActivity, isLoading: loadingActivity } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["Todays-Activity", "bookings"],
  });

  return { todaysActivity, loadingActivity };
}

export default useTodayActivity;
