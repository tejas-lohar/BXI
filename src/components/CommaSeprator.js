const CommaSeprator = (props) => {
  const number = props?.Price;

  const formattedNumber = number?.toLocaleString("en-IN");
  return formattedNumber;
};

export default CommaSeprator;
