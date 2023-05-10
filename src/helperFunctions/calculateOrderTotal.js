import _ from "lodash";

export const calculateOrderTotal = (items) => {
  var total = 0;
  if (items) {
    _.forEach(items, function (o) {
      total += parseFloat(o.productPrice) * o.QTY;
    });
  }
  total += 4.99;
  total = total.toFixed(2);

  return total;
};
