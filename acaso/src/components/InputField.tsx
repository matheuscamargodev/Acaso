import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value,placeholder, onChange }) => {
  return (
    <div className="mb-5">
      <label className="block pl-3 mb-2 text-left text-white-700 text-sm">{label}*</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#1E1F2F] rounded-lg text-white text-sm p-3 w-full"
        style={{ width: '100%' }} // Adicione esta linha para ajustar o comprimento
      />
    </div>
  );
};

export default InputField;
