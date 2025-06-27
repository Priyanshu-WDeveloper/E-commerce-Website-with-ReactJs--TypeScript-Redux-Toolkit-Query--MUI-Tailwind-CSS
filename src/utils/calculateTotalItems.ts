export function findMRP(
  discountedPrice: number,
  discountPercent: number
): number {
  if (discountPercent >= 100) {
    throw new Error("Discount cannot be 100% or more");
  }

  const mrp = discountedPrice / (1 - discountPercent / 100);
  return parseFloat(mrp.toFixed(2));
}

interface Item {
  id: string;
  price?: number;
  quantity: number;
  discountPercentage: number;
}

const calculateSelectedItemsTotals = (
  items: Item[],
  selectedItems: string[],
  platformFee: number,
  donationAmount?: number
) => {
  const selectedItemsData = items.filter((item) =>
    selectedItems.includes(item.id)
  );

  const selectedTotalPrice = selectedItemsData.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );

  const selectedTotalDiscount = selectedItemsData.reduce(
    (acc, item) =>
      acc +
      (((item.price ?? 0) * item.discountPercentage) / 100) * item.quantity,
    0
  );
  const selectedTotalDiscount2 = selectedItemsData.reduce((acc, item) => {
    if (!item.price) return acc; // Skip if price missing

    // Calculate MRP from discounted price & discount percentage
    const mrp = findMRP(item.price, item.discountPercentage);

    // Discount per unit = MRP - discounted price
    const discountPerUnit = mrp - item.price;

    // Add total discount for this item (discount per unit * quantity)
    return acc + discountPerUnit * item.quantity;
  }, 0);
  const selectedTotalMRP = selectedItemsData.reduce((acc, item) => {
    if (!item.price) return acc; // Skip if price missing
    // Calculate MRP from discounted price & discount percentage
    return acc + findMRP(item.price, item.discountPercentage) * item.quantity;
  }, 0);
  return {
    selectedTotalPrice,
    selectedTotalDiscount,
    selectedTotalDiscount2,
    // selectedTotalMRP: selectedTotalPrice + selectedTotalDiscount,
    selectedTotalMRP,
    selectedTotalAmount:
      selectedTotalPrice +
      platformFee +
      (donationAmount ? Number(donationAmount) : 0),
  };
};

export default calculateSelectedItemsTotals;
