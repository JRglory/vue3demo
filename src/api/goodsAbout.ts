import service from "./request";
import type { CreateGoods, UpdateGoods, SearchGoods } from "@/type/goodsAbout";
//创建商品
export function createGoods(token: string, createData: CreateGoods) {
  return service({
    url: "/v1/goods",
    method: "post",
    headers: { Authorization: token },
    data: {
      goodsName: createData.goodsName,
      goodsDescription: createData.goodsDescription,
      goodsPrice: createData.goodsPrice,
      goodsImage: createData.goodsImage,
    },
  });
}
//修改商品
export function updateGoods(
  token: string,
  updateData: UpdateGoods,
  id: string
) {
  return service({
    url: `/v1/goods/${id}`,
    method: "put",
    headers: { Authorization: token },
    data: {
      goodsPrice: updateData.goodsPrice,
      sell: updateData.sell,
    },
  });
}
//删除商品
export function deleteGoods(token: string, id: string) {
  return service({
    url: `/v1/goods/${id}`,
    method: "delete",
    headers: { Authorization: token },
  });
}
//查询商品
export function searchGoods(token: string, searchData: SearchGoods) {
  return service({
    url: `/v2/goods`,
    method: "get",
    headers: { Authorization: token },
    params: {
      page: searchData.page,
      size: searchData.size,
      sellFlag: searchData.sellFlag,
      search: searchData.search,
    },
  });
}
