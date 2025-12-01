// Write your code here
import './index.css'
import CartContext from '../context/CartContext'

const CartSummary = (props) => (
  <CartContext.Consumer>
    {value => {
      const {cartList, clearCart} = value
      let total = 0
      cartList.map(each => {
        total += parseInt(each.cost) * parseInt(each.quantity)
        return each
      })

      const length = cartList.length

      const change = () => {
        const {changeVariable} = props
        changeVariable()
        clearCart()
      }

      return (
        <div className="cart-summary">
          <h1 className="heading">
            <span className="span-heading">Order Total: </span>Rs {total}/-
          </h1>

          <p className="nav-link">{length} items in cart</p>
          <button onClick={change} className="button-checkout login-button" type="button">
            Place Order
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary