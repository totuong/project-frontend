export const getTime = () => {
  let msg = "";
  const hours = new Date().getHours();
  if (hours <= 9) {
    msg = "早上";
  } else if (hours <= 12) {
    msg = "上午";
  } else if (hours <= 18) {
    msg = "下午";
  } else {
    msg = "晚上";
  }
  return msg;
};

export const formatTimeAgo = (createdAt: Date | string): string => {
  if (!createdAt) return '';
  const createdDate =
    typeof createdAt === "string"
      ? new Date(createdAt.replace(" ", "T")) // Chuyển đổi chuỗi thành Date
      : createdAt; // Nếu đã là Date thì giữ nguyên

  const now = Date.now();
  const diff = now - createdDate.getTime(); // Tính chênh lệch thời gian tính bằng milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else if (days < 30) {
    return `${days} ngày trước`;
  } else {
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} tháng trước`;
    } else {
      const years = Math.floor(months / 12);
      return `${years} năm trước`;
    }
  }
};
