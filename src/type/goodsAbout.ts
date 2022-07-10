export interface GoodsPrice {
  goodsPrice: number;
}
export interface CreateGoods extends GoodsPrice {
  goodsName: string;
  goodsDescription: string;
  goodsImage: string;
}
export interface UpdateGoods extends GoodsPrice {
  sell: boolean;
}
export interface SearchGoods {
  page: number;
  size: number;
  sellFlag: boolean | null;
  search: string | null;
}

//查询商品接口
export interface SearchGoodsList {
  page: number;
  size: number;
  sellFlag: boolean | null;
  search: null | string;
}

//页数相关接口
export interface PageAbout {
  model: string;
  current: number;
  total: number;
  total_page: number;
  size: number;
}
