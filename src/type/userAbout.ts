//登录请求
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  username: string;
  pass: string;
  checkPass: string;
}
//User数据接口
export interface GoodsInformation {
  goodsname: string;
  goodsdescription: string;
  goodsprice: number;
  goodsimage: string;
  sell: boolean;
}