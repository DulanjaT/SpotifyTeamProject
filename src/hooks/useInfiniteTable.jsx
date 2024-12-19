import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useMaterialReactTable } from "material-react-table";
import { useRef } from "react";

export default function useInfiniteTable(path, columns, queryFn, formatData, nextPageAccessor, opts = {})
{
	const tableContainerRef = useRef(null);
	
	const { data, error, hasNextPage, fetchNextPage, isFetching, isLoading } = useInfiniteQuery({
		queryKey: [path],
		initialPageParam: path,
		queryFn,
		getNextPageParam: nextPageAccessor,
		placeholderData: keepPreviousData
	});
	const [ tableData, total ] = formatData(data);

	if (hasNextPage && !isLoading && !isFetching)
		fetchNextPage();

	const table = useMaterialReactTable(Object.assign({
		columns,
		data: tableData || [],
		state: { isLoading },
		enableFullScreenToggle: false,
		enableColumnActions: false,
		enableHiding: false,
		enablePagination: false,
		enableRowVirtualization: true,
		rowVirtualizerOptions: { estimateSize: () => 73 },
		retry: false,
		muiTableContainerProps: {
			ref: tableContainerRef,
			sx: { scrollbarWidth: "thin", height: "47rem" }
		},
		enableDensityToggle: false,
		initialState: { density: "compact" },
		muiTablePaperProps: { elevation: 0 }
	}, opts));

	return ({ table, data, tableData, total, error });
}
