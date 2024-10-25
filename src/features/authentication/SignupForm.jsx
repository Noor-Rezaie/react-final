import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, reset, handleSubmit } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();

  function onSubmit({ fullName, email, password }) {
    // signup({ fullName, email, password }, { onSettled: reset });
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="fullName"
          {...register("fullName", {
            required:
              "Please make sure to full the Field which is required !😉",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required:
              "Please make sure to full the Field which is required !😉",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please Write a valid Email.😒",
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required:
              "Please make sure to full the Field which is required !😉",
            minLength: {
              value: 8,
              message: "Password should be at leat 8 Chars!😉",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required:
              "Please make sure to full the Field which is required !😉",
            validate: (value) =>
              value === getValues().password || "Passwords mustt match😎",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isLoading} type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
