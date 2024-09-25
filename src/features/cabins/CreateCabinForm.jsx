import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editCabinId, ...editValue } = cabinToEdit;

  const isEditSession = Boolean(editCabinId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });
  const { errors } = formState;
  const { isCreating, createMutate } = useCreateCabin();
  const { isEditing, editMutate } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.image === "string" ? editValue.image : data.image[0];
    if (isEditSession) {
      editMutate(
        { newEditCabin: { ...data, image }, id: editCabinId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createMutate(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {
    console.error(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "Modal" : "v"}
    >
      <FormRow errorMessage={errors?.name?.message} label={"Name"}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        errorMessage={errors?.maxCapacity?.message}
        label={"Max Capacity"}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow
        errorMessage={errors?.regularPrice?.message}
        label={"Regular Price"}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        errorMessage={
          errors?.discount?.message || errors?.discount?.validate || ""
        }
        label={"Discount"}
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price.",
          })}
        />
      </FormRow>

      <FormRow
        errorMessage={errors?.description?.message}
        label={"Description"}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label={"Cabin Photo"}>
        <FileInput
          id="image"
          defaultValue=""
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating}
          onClick={() => onCloseModal?.(false)}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
