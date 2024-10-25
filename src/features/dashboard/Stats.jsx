/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, numDays, cabinCount, confirmedStays }) {
  //   1
  const numBookings = bookings.length;

  //     2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //      3
  const checkins = confirmedStays.length;

  //      4
  // number of CHECKED-IN night / all availble nights -- (number of Days / number of Cabins)
  const ocupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check in"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        value={Math.round(ocupation * 100) + " % "}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
