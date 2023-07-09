import React from "react";
import { useForm } from "react-hook-form";
import ValidationUtils from "../Validattion";

const Formvalidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  console.log(errors);
  const submit = (data) => {};
  const validationSchema = ValidationUtils;
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input type="text" {...register("phone", validationSchema.phone)} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>
        <input
          style={{
            width: "400px",
          }}
          {...register("name", validationSchema.name)}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Formvalidation;
