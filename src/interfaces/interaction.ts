import {BaseModel} from './base.interface';

export enum ReferenceType {
  POST = 'post',
  COMMENT = 'comment',
}

export type LikeProps = {
  state: boolean;
  type: ReferenceType;
  referenceId: string;
  userId: string;
};

export interface Like extends LikeProps, BaseModel {}

export interface Dislike extends LikeProps, BaseModel {}
