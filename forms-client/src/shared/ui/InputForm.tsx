interface Props {
  label: string;
  placeholder?: string;
  type?: string;
}

export const InputForm: React.FC<Props> = ({ label, placeholder, type,  ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
        <label className="font-medium">{label}</label>
        <input placeholder={placeholder} {...props} type={type}
        className=" border-b border-slate-600 outline-none px-2 py-1 " />
    </div>
  )
}

export default InputForm
