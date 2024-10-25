/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isDeleteing, deleteCabin } = useDeleteCabin();

  const {
    name,
    maxCapacity,
    regularPrice,
    description,
    discount,
    id: cabinId,
    image,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `COPY OF ${name}`,
      maxCapacity,
      regularPrice,
      image,
      discount,
      description,
    });
  }

  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div> It is okay for {maxCapacity} poeple. </div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>---</span>
      )}
      <div>
        {/* THE BELOW IS THE BUPLICATING BTN */}
        <button onClick={handleDuplicate} disabled={isCreating}>
          <HiSquare2Stack />
        </button>

        {/* MODAL WINDOW */}
        <Modal>
          <Modal.Open opens="edit">
            {/* THE BELOW IS THE EDIT BTN */}
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinForEdit={cabin} />
          </Modal.Window>

          {/* THE BELOW IS THE DLETEING BYN */}
          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleteing}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}

export default CabinRow;
