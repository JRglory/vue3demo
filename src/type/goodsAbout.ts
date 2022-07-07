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
  search: string;
}
