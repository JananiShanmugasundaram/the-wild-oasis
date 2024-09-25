import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import useCheckout from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, ischeckingout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={ischeckingout}
    >
      {ischeckingout ? <Spinner /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
