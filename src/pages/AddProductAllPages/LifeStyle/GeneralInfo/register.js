import { z } from "zod";

const checkEmail = async (email) => {
  const emailProviders = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
    "@aol.com",
    "@zoho.com",
    "@mail.com",
    "@protonmail.com",
    "@yandex.com",
    "@icloud.com",
    "@gmx.com",
    "@mail.ru",
    "@inbox.com",
    "@live.com",
    "@msn.com",
    "@qq.com",
    "@163.com",
    "@163.net",
    "@126.com",
    "@yeah.net",
    "@sina.com",
    "@sohu.com",
    "@tom.com",
    "@sogou.com",
    "@139.com",
    "@21cn.com",
    "@188.com",
    "@wo.com.cn",
    "@aliyun.com",
    "@foxmail.com",
    "@outlook.com",
    "@ymail.com",
    "@rocketmail.com",
    "@bellsouth.net",
  ];
  if (emailProviders.includes("@" + email.split("@")[1])) {
    return false;
  }
  return true;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const RegisterValidation = z
  .object({
    name: z.string().trim().min(3),
    companyType: z.string().min(1, "Please Select Company Type"),
    phoneNumber: z.string().regex(/^\d+$/).length(10),
    email: z.string().trim().email().refine(checkEmail, {
      message: "Please Enter Your Company Email Address",
    }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    cin: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must be same",
    path: ["confirmPassword"],
  });
