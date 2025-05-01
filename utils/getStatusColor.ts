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

export const getUserStatusColor = (role: string) => {
  switch (role) {
    case "user":
      return "bg-blue-100 text-blue-800";
    case "admin":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getBannedStatusColor = (status: boolean) => {
  switch (status) {
    case true:
      return "bg-red-100 text-red-800"; // Red for "banned"
    case false:
      return "bg-green-100 text-green-800"; // Green for "not banned"
    default:
      return "bg-gray-100 text-gray-800"; // Default color
  }
};
