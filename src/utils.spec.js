import { apiCall } from './utils';
import { mockData } from './mockData';

const axios = {
    get: jest.fn().mockImplementationOnce(() => Promise.resolve({ data: 'mock data' }))
};

describe('apiCall', () => {
    it('fetches successfully data from an API', async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
      await expect(apiCall()).resolves.toEqual(mockData);
    });
  });