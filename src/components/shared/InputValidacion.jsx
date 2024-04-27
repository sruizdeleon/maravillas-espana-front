

export default function InputValidation({ value, onChange, type, rules }) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
      ></input>

      {rules &&
      value.length > 0 &&{} ? (
        <ul className="alert alert-dark p-2 m-0 rounded-0">
          {rules.map((rule) => {
            {
              return (
                <li className="list-unstyled custom-li fs-7">
                  {" "}
                  {rule.fn(value) ? "✔️ " : "❗"} {rule.text}
                </li>
              );
            }
          })}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
