export interface IComment {
  _id?: string;
  userId: string;
  postId: string;
  content: string;
} //

export interface IResPComment {
  _id?: string;
  userId: {
    _id: string;
    username: string;
  };
  postId: {
    _id: string;
    title: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
} //

export interface IResDataCountComment {
  data: IResCountComment[];
}

export interface IResDataViewComment {
  data: IResViewComment[];
}

export interface IResViewComment {
  _id: string;
  userId: {
    _id: string;
    username: string;
    avatar: string;
  };
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResCountComment {
  count: number;
  Post: {
    _id?: string;
    title: string;
    author: string;
    content: string;
  };
  Author: {
    _id?: string;
    username: string;
    avatar: string;
  };
}

export interface ICommentDoc {
  docs: IResPComment[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}
