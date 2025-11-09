import api from "../../baseAPIAxios";

export const downloadStatistics = async (userId: string): Promise<void> => {
  const response = await api.get(`/api/statistics/${userId}/download`, {
    responseType: 'blob' // важно: получаем бинарный файл
  });

  const url = window.URL.createObjectURL(new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }));

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `statistics_${userId}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};