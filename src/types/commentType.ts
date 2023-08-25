import { UserType } from "./userType";

interface ReactionComment {
  name: string;
  author: string;
}

export interface CommentType {
  _id?: string;
  auth: UserType;
  content: string;
  replies: Array<string>;
  reaction: Array<ReactionComment>;
  edited: boolean;
}
