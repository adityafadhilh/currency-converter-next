type TextInputProps = {
    onChange: (value: string) => void,
    value: string
} 

export const TextInput = ({onChange, value}: TextInputProps) => {
    return (
        <input
            className="flex-1 text-xl pl-4 focus:outline-hidden [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            onChange={(e) => {
                onChange(e.target.value);
            }}
            value={value}
        />
    )
}