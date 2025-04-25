const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-pink-500 text-white";
    case "delivered":
      return "bg-green-500 text-white";
    case "shipped":
      return "bg-purple-500 text-white";
    case "pending":
      return "bg-blue-500 text-white";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-500 text-gray-800";
  }
};

export default getStatusColor;

export const getUserStatusColor = (status: string) => {
  switch (status) {
    case "User":
      return "bg-gray-100 text-green";
    case "Admin":
      return "bg-green-400 text-";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
