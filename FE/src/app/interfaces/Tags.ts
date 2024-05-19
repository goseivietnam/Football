export interface IDocHashTags {
  message: string;
  data: IHashTags[];
}

export interface IHashTags {
  title: string;
  _id?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}
