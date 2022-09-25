const MakeSelectBox = ({ list, value, label, style, id, onChange }) => {
  const optionEl = list.map(item => (
    <option key={item.value} value={item.value}>
      {item.text}
    </option>
  ));

  return (
    <div className="mr-7">
      <label className="mb-2 flex flex-col font-semibold" htmlFor={id}>
        {label}
      </label>
      <select
        name={id}
        id={id}
        value={value}
        onChange={e => {
          const found = list.find(({ value }) => `${value}` === e.target.value); // value는 숫자고 e.target.value는 문자다

          if (found) {
            onChange && onChange(found); // {}
          }
        }}
        className={` ${style ? style : 'w-48'} rounded-md border border-gray-300 py-1`}
      >
        {optionEl}
      </select>
    </div>
  );
};

export default MakeSelectBox;
