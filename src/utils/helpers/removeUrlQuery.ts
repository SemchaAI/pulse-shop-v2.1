// import qs from 'qs';

// interface RemoveQueryParams {
//   key: string | string[]; // Single key or an array of keys to remove
//   params?: string; // Existing query string to modify
// }

// export const removeUrlQuery = ({
//   key,
//   params = '',
// }: RemoveQueryParams): string => {
//   const currentParams = qs.parse(params, { ignoreQueryPrefix: true });

//   // If key is an array, loop through each key to delete
//   const keys = Array.isArray(key) ? key : [key];

//   // Remove the specified keys
//   keys.forEach((k) => {
//     delete currentParams[k];
//   });

//   // Return the updated query string without the deleted keys
//   return `?${qs.stringify(currentParams, { arrayFormat: 'comma' })}`;
// };
