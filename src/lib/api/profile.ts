import Axios from 'axios';
import { ExtendedUserPost } from 'src/interfaces/user';
import { User } from 'src/interfaces/user';

const MyriadAPI = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://34.101.124.163:3000'
});

export const getUserProfile = async (id: string): Promise<ExtendedUserPost> => {
  const { data } = await MyriadAPI.request<ExtendedUserPost>({
    url: `users/${id}`,
    method: 'GET',
    params: {
      filter: {
        include: [
          {
            relation: 'posts',
            scope: {
              include: [
                {
                  relation: 'comments'
                  // scope: {
                  //   include: [
                  //     {
                  //       relation: 'user'
                  //     }
                  //   ]
                  // }
                }
              ]
            }
          }
        ]
      }
    }
  });

  return data;
};

export const updateUserProfile = async (id: string, attributes: Partial<User>) => {
  const { data } = await MyriadAPI({
    url: `/users/${id}`,
    method: 'PATCH',
    data: attributes
  });

  return data;
};