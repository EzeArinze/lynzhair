const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-blue-100 text-blue-800";
    case "Shipped":
      return "bg-purple-100 text-purple-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "User":
      return "bg-gray-100 text-green";
    case "Admin":
      return "bg-green-400 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default getStatusColor;
