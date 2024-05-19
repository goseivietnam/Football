export interface IImage {
  url: string;
  public_id: string;
  _id: string;
}

export interface IInforOrderShipping {
  name: string;
  address: string;
  phone: string;
  noteShipping: string;
}

export interface IProductInfo {
  _id: string;
  title: string;
  author: string;
  content: string;
  images: IImage[];
  likes: number;
  category: string;
  comments: string[];
  is_active: boolean;
  status: string;
  tags: string[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  price: string;
}

export interface IOrderItem {
  product: IProductInfo;
  quantity: number;
  _id: string;
}

export interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  phone: string;
  role: string;
  is_active: boolean;
  deleted: boolean;
  postList: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  cart: string[];
  buyed: string[];
  data?:any[];
}

export interface IOrder {
  inforOrderShipping: IInforOrderShipping;
  _id: string;
  user: IUserInfo;
  data?:any[];
  items: IOrderItem[];
  status: string;
  total: number;
  paymentMethodId: string;
  createdAt: string;
  updatedAt: string;
}
