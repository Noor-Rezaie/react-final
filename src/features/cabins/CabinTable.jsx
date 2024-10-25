import Spinner from "../../ui/Spinner";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const [searchParams] = useSearchParams();

  // THIS CAN FETCH  THE DATA FROM THE DATABASE
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // 1)THESE ARE FOR FILTERING THE DATA BELOW
  const filterValue = searchParams.get("discount") || "all";
  console.log(filterValue);

  let filterdCabins;
  if (filterValue === "all") filterdCabins = cabins;

  if (filterValue === "no-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filterdCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2)THESE ARE FOR SORTING THE DATA BELOW
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterdCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>CABIN</div>
          <div>CAPACITY</div>
          <div>PRICE</div>
          <div>DISCOUNT</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          // data={filterdCabins}
          // data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
