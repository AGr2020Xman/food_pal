const QuantityList = ({ changeQuantity, existsId, initialQuantity }) => {
  let options = [];
  for (let i = 1; i <= 10; i++) {
    let option = (
      <option key={i} value={i}>
        {i}
      </option>
    );
    options.push(option);
  }

  return (
    <form>
      <select
        id="menu"
        name="quantity"
        tabIndex="1"
        onChange={(e) => {
          changeQuantity(existsId, e);
        }}
        value={initialQuantity}
      >
        {options.map((option) => option)}
      </select>
    </form>
  );
};

export default QuantityList;
