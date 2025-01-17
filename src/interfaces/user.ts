import {BaseModel} from './base.interface';
import {Currency} from './currency';
import {TransactionDetail} from './transaction';

export interface UserSocialMedia {
  id: string;
  verified: boolean;
  platform: string;
  peopleId: string;
  userId: string;
}

export type BaseUser = {
  name: string;
  profilePictureURL?: string;
};

export type UserProps = BaseUser & {
  bio?: string;
  bannerImageUrl?: string;
  fcmTokens?: string[];
  skipTour?: boolean;
  onTimeline?: string;
  skipWelcome?: boolean;
};

export interface User extends UserProps, BaseModel {
  currencies: Currency[];
}

export interface UserTransactionDetail {
  sent: TransactionDetail[];
  received: TransactionDetail[];
}
