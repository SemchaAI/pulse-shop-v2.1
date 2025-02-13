import qs from 'qs';
interface QueryParams {
  key: string | string[];
  value: string | string[];
  params?: string;
}

export const formUrlQuery = ({
  key,
  value,
  params = '',
}: QueryParams): string => {
  const currentParams = qs.parse(params, { ignoreQueryPrefix: true });

  const keys = Array.isArray(key) ? key : [key];
  const values = Array.isArray(value) ? value : [value];

  // Update the query parameter
  keys.forEach((k, index) => {
    currentParams[k] = values[index] || '';
  });

  return `?${qs.stringify(currentParams, { arrayFormat: 'comma' })}`;
};
