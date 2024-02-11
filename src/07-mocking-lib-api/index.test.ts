import axios, { AxiosStatic } from 'axios';

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

type MockedAxios = AxiosStatic & {
  create: jest.Mock & { mockReturnValue: Function };
};

const mockedAxios = axios as unknown as MockedAxios;

jest.mock('axios');

beforeEach(() => {
  jest.clearAllMocks();

  mockedAxios.create.mockReturnValue({
    get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
  });
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toBeCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create().get).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toEqual('mocked data');
  });
});
