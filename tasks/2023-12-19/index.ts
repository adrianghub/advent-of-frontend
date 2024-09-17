export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  pageNumber: number
) {
  const currentPageItems = items.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentPageItems,
    totalPages,
    totalItems: items.length,
  };
}
