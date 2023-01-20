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
  itemName: string;
  itemPrice: number;
  quantity: number;
  options: MenuItemsSelected;
};
