export const handleFomatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
  const year = date.getFullYear();
  // Định dạng lại chuỗi ngày, tháng, năm
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
