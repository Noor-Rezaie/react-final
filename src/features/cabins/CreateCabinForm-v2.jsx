import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";

// THE PLACE OF THE CODES OF STYLING

function CreateCabinForm() {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success(
        "WellDone!👌 The new cabin has benn created successfully!😍"
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            required: "The image field is required! 😁",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>ADD cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
