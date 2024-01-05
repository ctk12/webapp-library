import { TitleTextC, TitleTextD } from "@/shared/Typography";
import Pagination from "@/components/Pagination";
import { DataLoader } from "@/shared/AppLoader/MainLoader";
import { TablePropsType, tableRowExtendObject } from "@/types/Table";
import TableRow from "./TableRow";
import "./Table.scss";
import { useAuthContext } from "@/context/AuthContext";

function Table<T extends tableRowExtendObject>(props: TablePropsType<T>) {
  const { columnsProps, paginationProps } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAdmin }: any = useAuthContext();

  const isMyBooks = [...columnsProps.tableColumns].reverse()[0];

  const tableColumnsData = isMyBooks.key !== "actions"
    ? columnsProps.tableColumns
    : isAdmin
      ? columnsProps.tableColumns
      : columnsProps.tableColumns.slice(0, -1);

  return (
      <div className="flex flex-col w-full">
        <div className="custom-table mb-4" style={{ border: "1px solid var(--borders)" }}>
          <div className="custom-table__head" id="th">
            <div className="tr" style={{ padding: "0 6px", borderBottom: "1px solid var(--borders)", minHeight: 30 }}>
              {tableColumnsData.map(data => {
                return (
                  <div
                    className="td"
                    key={data.key}
                    style={{
                        overflowWrap: "anywhere",
                        width: `${data.width}`,
                    }}
                   >
                    <TitleTextD>{data.title}</TitleTextD>
                   </div>
                )
              })}
            </div>
          </div>

          <div className="custom-table__body" id="tbody">
            {paginationProps.fetchLoading ? (
              <div
                className="tr justify-center"
                style={{ height: 300, minHeight: 300, paddingLeft: 0, paddingRight: 0 }}
              >
                <DataLoader />
              </div>
            ) : (
              <>
                {paginationProps.paginatedData.length === 0 && (
                  <div
                  className="tr justify-center"
                  style={{ height: 300, minHeight: 300, paddingLeft: 0, paddingRight: 0 }}
                >
                  <TitleTextC>No Data Found</TitleTextC>
                </div>
                )}
                {[...paginationProps.paginatedData]?.map((data, index) => {
                  return (
                    <TableRow
                      key={data.id}
                      data={data}
                      {...columnsProps}
                      tableColumns={tableColumnsData}
                      isLast={(paginationProps.paginatedData.length - 1) === index}
                      isEdit={columnsProps.dataUpdate?.id === data.id}
                      updateLoading={columnsProps.updateLoading && columnsProps.dataUpdate?.id === data.id}
                    />
                  )
                })}
              </>
            )}
          </div>
        </div>
        <Pagination paginationData={paginationProps.pagination} onPageChange={paginationProps.handlePageChange} />
      </div>
  );
}

export default Table;