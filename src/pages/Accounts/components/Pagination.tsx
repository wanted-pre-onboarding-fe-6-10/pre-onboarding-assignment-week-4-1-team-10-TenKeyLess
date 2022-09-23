export const Pagination = ({ page, data, getLastPage, getNextPage }: any) => {
  return (
    <div className="overflow-x-auto relative">
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900">{10 * (page - 1) + 1}</span> to{' '}
          <span className="font-semibold text-gray-900 ">
            {10 * (page - 1) + Number(`${data ? data.length : 0}`)}
          </span>{' '}
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={getLastPage}
          >
            Prev
          </button>
          <button
            className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={getNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
