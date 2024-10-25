/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// THE PLACE OF THE CODES OF STYLING

function CreateCabinForm({ cabinForEdit = {}, onCloseModal }) {
  // THIS IS FOR CREATEING && EDIT THE CABINS HOOK
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  // THE NEXT PART
  const isProcessing = isCreating || isEditing;

  // THE NEXT PART
  const { id: editId, ...editValues } = cabinForEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // NEXT PART
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        { onSuccess: (data) => reset() }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  // NEXT PART
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* THE NEW FORMROW  */}
      <FormRow label="cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required! 😁",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isProcessing}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required!😁",
            min: {
              value: 1,
              message: "Maximum capacity should be at least 1!😜",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isProcessing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required!😁",
            min: {
              value: 1,
              message: "The price should be at least 1!😜",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isProcessing}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required! 😁",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regulare price!😎",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "description is required! 😁",
          })}
        />
      </FormRow>

      <FormRow label="cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "The image field is required! 😁",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "EDIT CABIN✔" : "ADD CABIN👍"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
