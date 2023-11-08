interface Props {
  totalPrice: number;
  totalQuantity: number;
  totalWithTax: number;
}

export default function OrderPaymentPriceDetails({
  totalPrice,
  totalQuantity,
  totalWithTax,
}: Props) {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex items-center justify-between">
        <h5 className="text-muted-foreground">Items ({totalQuantity})</h5>
        <p className="font-bold">${totalPrice.toFixed(2).replace(".", ",")}</p>
      </div>
      <div className="flex items-center justify-between">
        <h5 className="text-muted-foreground">Tax (18%)</h5>
        <p className="font-bold">
          ${(totalPrice * 0.18).toFixed(2).replace(".", ",")}
        </p>
      </div>
      <div className="border-b border-dashed border-gray-400 py-1" />
      <div className="flex items-center justify-between py-2">
        <h5 className="text-muted-foreground">Total</h5>
        <p className="text-lg font-extrabold">
          ${totalWithTax.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </div>
  );
}
