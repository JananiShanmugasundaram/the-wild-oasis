import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import useDeleteBooking from "./useDeleteBooking";
import ButtonGroup from "../../ui/ButtonGroup";

function DeleteBooking({ bookingId, onCloseModal }) {
  const navigate = useNavigate();
  const { deleteDataFn, isDeleting } = useDeleteBooking();
  const Box = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: (var(--color-grey-100));
    border: 1px solid var(--color-grey-0);
    border-radius: var(--border-radius-md);
    margin: 15px;
  `;

  return (
    <Box>
      <div>Do you want to delete the booking?</div>
      <ButtonGroup>
        <Button
          onClick={() => {
            deleteDataFn(bookingId);
            onCloseModal();
            navigate(-1);
          }}
          disabled={isDeleting}
        >
          Delete
        </Button>
        <Button
          variation="secondary"
          disabled={isDeleting}
          onClick={() => onCloseModal()}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default DeleteBooking;
