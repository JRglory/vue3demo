import service from "./request";
import type {LoginRequest,RegisterRequest} from "@/type/userAbout"
//用户登录
export function userLogin(data: LoginRequest) {
  return service({
    url: "/v1/login",
    method: "post",
    data: {
      username: data.username,
      password: data.password,
    },
  });
}
//用户注册
export function userRegister(data: RegisterRequest) {
  return service({
    url: "/v1/register",
    method: "post",
    data: {
      username: data.username,
      password: data.pass,
    },
  });
}
