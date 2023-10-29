export interface Reviews {
  userId?: string | '';
  username?: string | '';
  rating: number;
  remarks: string;
  createdAt: number;
  updatedAt: number;
}

export interface Products {
  _id?: any;
  title: string;
  description: string;
  image: string;
  reviews: Reviews[];
  createdAt: number;
  updatedAt: number;
}
