import axios from "axios";

const deleteProduct = async (id: string) => {
  try {
    const res = await axios.delete(`/api/products/${id}`);
    console.log(res.data.message);
  } catch (error) {
    console.log(error);
  }
};

export default deleteProduct;
// Compare this snippet from app/api/products/%5Bid%5D/route.ts:
