import api from "./api";

export const downloadInventoryPDF = async () => {
  const response = await api.get("/reports/inventory/pdf", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));

  const link = document.createElement("a");

  link.href = url;
  link.download = "AuraTag_Inventory_Report.pdf";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};