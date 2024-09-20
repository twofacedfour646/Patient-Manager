
export default function CustomInput({label, name, type, value, changeHandler}: {changeHandler: (event: React.FormEvent<HTMLInputElement>) => void, value: string, label: string, name: string, type: string}) {
  return (
    <div>
        <label className="block text-gray-300 text-sm font-bold mb-2">{label}</label>
        <input onChange={changeHandler} value={value} className="shadow appearance-none bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline focus:shadow-outline focus:outline-green-500 focus:outline-offset-2" id={name} name={name} type={type} placeholder={label}/>
    </div>
  )
}
