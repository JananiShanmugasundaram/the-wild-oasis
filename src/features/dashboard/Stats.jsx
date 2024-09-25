import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "../dashboard/Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, i) => acc + i.totalPrice, 0);
  const checkins = confirmedStays?.length;

  const occupancyRate =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />{" "}
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />{" "}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
