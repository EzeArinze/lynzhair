// npm install jspdf jspdf-autotable
//npm i @types/jspdf : will install dependency

// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { useState } from "react";
// import { GetDate } from "./getDate";
// import formatCurrency from "./formatCurrency";
// import { getShippingMethodInfo } from "./getShippingMethodInfo";
// import { OrderDetail } from "./types";

// export const useGenerateReceipt = (order: OrderDetail) => {
//   const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

//   const generateReceipt = async () => {
//     if (!order) return;

//     setIsGeneratingPdf(true);

//     try {
//       // Create a new PDF document
//       const doc = new jsPDF();
//       const pageWidth = doc.internal.pageSize.getWidth();

//       // Add company logo/header
//       doc.setFontSize(20);
//       doc.setTextColor(0, 0, 0);
//       doc.text("Lynz Hair", pageWidth / 2, 20, { align: "center" });

//       doc.setFontSize(12);
//       doc.text("Receipt", pageWidth / 2, 30, { align: "center" });

//       // Add order information
//       doc.setFontSize(10);
//       doc.text(`Order Number: ${order?.orderNumber}`, 15, 40);
//       doc.text(`Date: ${GetDate(order.orderDate)}`, 15, 45);
//       doc.text(`Status: ${order.status}`, 15, 50);

//       // Add customer information
//       doc.text("Customer Information:", 15, 60);
//       doc.text(`Name: ${order.customerName}`, 15, 65);
//       doc.text(`Email: ${order.customerName}`, 15, 70);
//       doc.text(`Phone: ${order.phone_number}`, 15, 75);

//       // Add shipping information
//       doc.text("Shipping Information:", 15, 85);
//       doc.text(`Address: ${order.address}`, 15, 90);
//       doc.text(`City: ${order.city}, State: ${order.state}`, 15, 95);
//       doc.text(`Method: ${order.shippingMethod}`, 15, 100);

//       // Add product table
//       const tableColumn = ["Product", "Price", "Quantity", "Total"];
//       const tableRows: (string | number)[][] = [];

//       // Calculate subtotal
//       const subtotal = order.products.reduce((sum, item) => {
//         return sum + item.product.price * item.quantity;
//       }, 0);

//       // Calculate shipping cost

//       // Add products to table
//       order.products.forEach((item) => {
//         const productData = [
//           item.product.name,
//           formatCurrency(item.product.price, order.currency),
//           item.quantity,
//           formatCurrency(item.product.price * item.quantity, order.currency),
//         ];
//         tableRows.push(productData);
//       });

//       doc.autoTable({
//         head: [tableColumn],
//         body: tableRows,
//         startY: 110,
//         theme: "grid",
//         styles: { fontSize: 8 },
//         headStyles: { fillColor: [100, 100, 100] },
//       });

//       // Get the final y position after the table

//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const finalY = (doc as any).lastAutoTable.finalY || 150;

//       // Add totals
//       doc.text(
//         `Subtotal: ${formatCurrency(subtotal, order.currency)}`,
//         15,
//         finalY + 10
//       );
//       doc.text(
//         `Shipping: ${order.freeShipping ? "Free" : getShippingMethodInfo(order.shippingMethod)}`,
//         15,
//         finalY + 15
//       );
//       doc.text(
//         `Total: ${formatCurrency(order.totalPrice, order.currency)}`,
//         15,
//         finalY + 20
//       );

//       // Add payment information
//       doc.text("Payment Information:", 15, finalY + 30);
//       doc.text(`Method: Paystack`, 15, finalY + 35);
//       doc.text(
//         `Transaction ID: ${order.paystackPaymentIntentId}`,
//         15,
//         finalY + 40
//       );

//       // Add footer
//       doc.setFontSize(8);
//       doc.text("Thank you for your purchase!", pageWidth / 2, finalY + 50, {
//         align: "center",
//       });
//       doc.text(
//         "For any questions, please contact support@lynzhair.com",
//         pageWidth / 2,
//         finalY + 55,
//         {
//           align: "center",
//         }
//       );

//       // Save the PDF
//       doc.save(`receipt-${order.orderNumber}.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     } finally {
//       setIsGeneratingPdf(false);
//     }
//   };

//   return { isGeneratingPdf, generateReceipt };
// };
