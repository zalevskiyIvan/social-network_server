export type UserType = {
  id?: number;
  username: string;
  email: string;
  password: string;
  posts?: PostType[];
};

export type PostType = {
  userId?: number;
  title: string;
  description: string;
  img?: string;
};

export type MessageType = {
  senderId: number;
  reciverId: number;
  text: string;
};
