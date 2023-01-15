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
