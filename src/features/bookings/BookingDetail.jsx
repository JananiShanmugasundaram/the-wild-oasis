import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import DeleteBooking from "./DeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();

  const { booking, isLoading } = useBooking();
  // const status = "checked-in";
  const { checkout, ischeckingout } = useCheckout();

  const moveBack = useMoveBack();

  if (booking === undefined) return <Empty resourceName="booking" />;
  if (isLoading) {
    return <Spinner />;
  }
  const { id: bookingId, status } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking Id #{bookingId} </Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              onClick={() => checkout(bookingId)}
              disabled={ischeckingout}
            >
              Check out
            </Button>
          )}
          {status === "unconfirmed" && (
            <Modal.Open open="deletebooking">
              <Button variation="secondary">Delete</Button>
            </Modal.Open>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name="deletebooking">
          <DeleteBooking bookingId={bookingId} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
