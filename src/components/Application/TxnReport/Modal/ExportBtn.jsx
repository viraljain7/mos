import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ExportBtn({ isLoading,csvData, fileName  }) {
    const exportToCSV = () => {
        if (!csvData || csvData.length === 0) {
          toast.info("No data to export");
          return;
        }
    
        // Flatten nested objects (e.g., user.name or fundbank.bankName)
        const cleanData = csvData.map(row => {
          const newRow = {};
    
          for (const key in row) {
            const value = row[key];
    
            if (typeof value === "object" && value !== null) {
              // Try to use 'name' or 'bankName' if exists
              newRow[key] = value.name || value.bankName || JSON.stringify(value);
            } else {
              newRow[key] = value;
            }
          }
    
          return newRow;
        });
    
        const headers = Object.keys(cleanData[0]);
        const csvRows = [
          headers.join(","), // header row
          ...cleanData.map(row =>
            headers.map(field => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`).join(",")
          )
        ];
    
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    
  
    return (
     
      <Link
        onClick={exportToCSV}
                to="#"
                className="btn btn-sm btn-success px-20 py-6 radius-4 d-inline-flex align-items-center gap-1"
                disabled={isLoading}
              >
                <Icon icon="solar:download-linear" className="text-xl" />
                Export
              </Link>
  )
}

export default ExportBtn
