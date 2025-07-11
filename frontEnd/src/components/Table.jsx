
import PropTypes from "prop-types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "./ui/skeleton";


const Table = ({ columns, data, renderRow, isLoading, error, page, setPage, lastPage }) => {

  if (isLoading) {
    return (
      <div className="rounded-md bg-white w-full min-h-screen p-6 ">
        <div className="flex justify-between ">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="overflow-auto p-6">
          <table className="min-w-full ">
            <thead className=" p-2">
              <tr>

                <th><Skeleton className="h-4 w-24" /></th>
                <th><Skeleton className="h-4 w-24" /></th>
                <th><Skeleton className="h-4 w-24" /></th>
                <th><Skeleton className="h-4 w-24" /></th>
                <th><Skeleton className="h-4 w-24" /></th>
                <th><Skeleton className="h-4 w-24" /></th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {[...Array(5)].map((_, rowIdx) => (
                <tr key={rowIdx} className="h-[60px]">
                  {/* Info */}
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </td>
                  {/* CEF */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  {/* Class */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  {/* Phone */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  {/* Address */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen  bg-white p-4 rounded-lg flex justify-center items-center">
        <p className="text-red-500 text-[18px] text-center mt-5">Cnnot get Teachers ! Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <table className="w-full mt-14">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            {columns.map((col) => (
              <th key={col.accessor} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => renderRow(item, index))}
        </tbody>

      </table>
      <div className="mt-12">
        <Pagination className="w-fit">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {[...Array(lastPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={page === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < lastPage) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.func.isRequired,
  isLoading: PropTypes.isRequired,
  error: PropTypes.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  lastPage: PropTypes.number.isRequired,

};

export default Table;
