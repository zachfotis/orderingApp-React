export type Store = {
  _id: string;
  title: string;
  categories: string[];
  info: {
    deliveryTime: number;
    minimumOrder: number;
  };
  ratings: {
    average: number;
    total: number;
  };
  images: {
    logo: string;
    cover: string;
    thumb: string;
  };
};

export type Category = {
  name: string;
  icon: string;
  selected: boolean;
};

export type Address = {
  address: string;
  number: string;
  area: string;
  city: string;
  postalCode: string;
  lat: number;
  lng: number;
  confirmed: boolean;
};

export type FirestoreUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fullAddress: Address;
};

export type AuthUser = {
  uid: string;
  accessToken: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  isAnonymous?: boolean;
};

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  options?: {
    [key: string]: OptionItem;
  };
  isSingleOption?: {
    [key: string]: boolean;
  };
  image: string;
};

export type OptionItem = {
  [key: string]: number;
};

export type MenuItemsSelected = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export type Catalog = {
  [key: string]: MenuItem[];
};

export type BasketItem = {
  store: Store;
  selectedItem: BasketSelectedItem;
};

export type BasketSelectedItem = {
  id: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
  options: MenuItemsSelected;
};

export type Order = {
  _id: string;
  storeID: string;
  userUID: string;
  order: [BasketSelectedItem];
  orderTotal: number;
  createdAt: Date;
};
