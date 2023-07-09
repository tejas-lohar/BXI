import {
  Button,
  CircularProgress,
  Container,
  Input,
  Modal,
  Select,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

const useGetAllRoles = () =>
  useQuery("all-roles", async () => {
    return (await axios.get("/api/v1/roles/all-roles")).data;
  });

export default function AddUser() {
  const { isLoading, data } = useGetAllRoles();

  const { register, handleSubmit } = useForm();

  const addUserFormSubmitHandler = handleSubmit(async (formData) => {
    await axios.post("/api/v1/roles", formData);
    //TODO close the popup
  });

  if (isLoading) return <CircularProgress />;

  return (
    <form onSubmit={addUserFormSubmitHandler}>
      <Container>
        <Input {...register("email")} type="email" />
        <Input {...register("password")} type="password" />
        <Select native {...register("role")}>
          {data.roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Add New User</Button>
      </Container>
    </form>
  );
}
