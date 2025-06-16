import { useCallback, useMemo, useState } from "react";

interface ISearchProps<T> {
	items: T[];
	searchFn: (item: T, query: string) => boolean;
}

/**
 * Custom hook for searching through a list of items.
 * @param items - The list of items to search through.
 * @param searchFn - The function used to determine if an item matches the search query.
 * It should take an item and a query string, returning true if the item matches the query.
 * @template T - The type of items in the list.
 * @returns
 */
const useSearch = <T,>({ items, searchFn }: ISearchProps<T>) => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredItems = useMemo(() => {
		if (!searchQuery.trim()) return items;
		const query = searchQuery.toLowerCase();
		return items.filter((item) => searchFn(item, query));
	}, [items, searchQuery, searchFn]);

	const handleSearchChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(event.target.value);
		},
		[],
	);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
	}, []);

	return {
		searchQuery,
		filteredItems,
		handleSearchChange,
		clearSearch,
	};
};

export default useSearch;
