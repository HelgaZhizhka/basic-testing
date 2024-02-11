import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseUrl = 'https://jsonplaceholder.typicode.com';
const relativePath = 'users';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();

  const getMock = jest.fn().mockResolvedValue({ data: 'mocked data' });

  (axios.create as jest.Mock).mockImplementation(() => ({
    get: getMock,
  }));
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toBeCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.create().get).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toEqual('mocked data');
  });
});
