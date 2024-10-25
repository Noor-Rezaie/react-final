import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      {/* FILTERING */}
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      {/* SORTING */}
      <SortBy
        options={[
          { value: "name-asc", label: "SORT BY NAME (A-z)" },
          { value: "name-desc", label: "SORT BY NAME (Z-a)" },
          { value: "regularPrice-asc", label: "SORT BY PRICE (LOW FIRST)" },
          { value: "regularPrice-desc", label: "SORT BY PRICE (HIGH FIRST)" },
          {
            value: "maxCapacity-asc",
            label: "SORT BY MAX-CAPACITY (LOW FIRST)",
          },
          {
            value: "maxCapacity-desc",
            label: "SORT BY MAX-CAPACITY (HIGH FIRST)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
