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

    "@hotmail.com",
    "@aol.com",
    "@protonmail.com",
    "@zoho.com",
    "@mail.com",
    "@yandex.com",
    "@gmx.com",
    "@icloud.com",
    "@rediffmail.com",
    "@tutanota.com",
    "@yahoo.com",
    "@outlook.com",

    "@hotmail.co",
    "@aol.co",
    "@protonmail.co",
    "@zoho.co",
    "@mail.co",
    "@yandex.co",
    "@gmx.co",
    "@icloud.co",
    "@rediffmail.co",
    "@tutanota.co",
    "@yahoo.co",
    "@outlook.co",

    "@hotmail.in",
    "@aol.in",
    "@protonmail.in",
    "@zoho.in",
    "@mail.in",
    "@yandex.in",
    "@gmx.in",
    "@icloud.in",
    "@rediffmail.in",
    "@tutanota.in",
    "@yahoo.in",
    "@outlook.in",

    "@hotmail.co.in",
    "@aol.co.in",
    "@protonmail.co.in",
    "@zoho.co.in",
    "@mail.co.in",
    "@yandex.co.in",
    "@gmx.co.in",
    "@icloud.co.in",
    "@rediffmail.co.in",
    "@tutanota.co.in",
    "@yahoo.co.in",
    "@outlook.in",
  ];
  if (emailProviders.includes("@" + email.split("@")[1])) {
    return false;
  }
  return true;
};

// const phoneRegExp =
//   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const RegisterValidation = z
  .object({
    companyName: z
      .string()
      .trim()
      .min(3, "Company Name must be at least 3 characters"),
    companyType: z.string().min(1, "Please Select Company Type"),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "Phone Number must contain only digits")
      .length(10, "Phone Number must be 10 digits"),
    email: z.string().trim().email().refine(checkEmail, {
      message: "Please Enter a Valid Company Email Address",
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be strong: include lowercase, uppercase, digit, and special characters"
      )
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 8 characters"),
    cin: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must match",
    path: ["confirmPassword"],
  });
