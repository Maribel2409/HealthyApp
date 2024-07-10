const Input = ({ value, onChange, name, type, title, placeholder }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {title}
      </label>
      <input
        name={name}
        value={value}
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
