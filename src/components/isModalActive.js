import { CartModal } from "../Cartmodal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
export const showModal = function (
  currentModalState,
  updateModalState,
  cartItems
) {
  if (currentModalState) {
    return (
      <div>
        {" "}
        <CartModal
          open={currentModalState}
          onDismiss={() => updateModalState()}
          title="Order"
          content="There are no items in your cart"
          actions={
            <div className="ui teal button">
              {" "}
              <Link
                to="/checkout"
                className="menuitem"
                onClick={() => {
                  updateModalState();
                }}
              >
                <span style={{ color: "#ffffff" }}> Check Out</span>
              </Link>
            </div>
          }
          items={cartItems}
        />
      </div>
    );
  }
};
