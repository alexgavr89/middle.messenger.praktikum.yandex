export default function queryStringify<T>(data: T): string {
  if (data) {
    return `?${Object.entries(data)
      .map((kv) => kv.join('='))
      .join('&')}`;
  }

  return '/';
}
