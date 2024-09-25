import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window windowName="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <>
//         {" "}
//         <Button onClick={() => setIsOpenModal(!isOpenModal)}>
//           Add new cabin
//         </Button>
//         {isOpenModal && (
//           <Modal setIsOpenModal={setIsOpenModal}>
//             <CreateCabinForm setIsOpenModal={setIsOpenModal} />
//           </Modal>
//         )}
//       </>
//     </div>
//   );
// }

export default AddCabin;
