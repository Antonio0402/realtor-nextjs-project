export function makeQueryClient() {
  const cachedFetches = new Map<string, Promise<any>>();

  return function queryClient<QueryResult>(
    cache: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if(!cachedFetches.has(cache)) {
      cachedFetches.set(cache, query());
    }
    return cachedFetches.get(cache)!;
  }
}