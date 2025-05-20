
import PropTypes from "prop-types";

const Table = ({columns,data,renderRow}) => {


  return (
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
};

export default Table;
