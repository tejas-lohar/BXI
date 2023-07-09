// react query hook to get company member by id

import { useQuery } from "react-query";
import axios from "axios";

export default function useGetCompanyMemberById(id) {
  return useQuery(["companyMember", id], () =>
    axios.get(`assign/get_IamUser_ById/${id}`).then((res) => res.data)
  );
}
