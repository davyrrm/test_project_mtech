import React from 'react';
import './Table.css';

interface MyDataRow {
  [key: string]: string | number;
}

interface TableProps {
  data: MyDataRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  };
  
  const headerTranslations: { [key: string]: string } = {
    name: 'Имя',
    phone: 'Номер телефона',
    bday: 'Дата рождения',
    address: 'Адрес',
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className={`column-${index}`}>
                {headerTranslations[header] || header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={`${header}-${rowIndex}`} className={`column-${index} ${header === 'email' ? 'email-cell' : ''}`}>
                  {header === 'phone' ?
                    (typeof row[header] === 'string' ? formatPhoneNumber(row[header] as string) : row[header]) :
                    (header === 'email' ? <a href={`mailto:${row[header]}`}>{row[header]}</a> : row[header])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
