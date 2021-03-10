const QuantityList = ({ onChange, initialQuantity }) => {
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
          onChange(e.target.value);
        }}
        value={initialQuantity}
      >
        {options.map((option) => option)}
      </select>
    </form>
  );
};

export default QuantityList;
