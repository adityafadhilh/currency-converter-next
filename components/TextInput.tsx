type TextInputProps = {
    onChange: (value: string) => void,
    value: string,
    onFocus?: () => void,
    onBlur?: () => void
} 

export const TextInput = ({onChange, value, onBlur, onFocus}: TextInputProps) => {
    return (
        <input
            className="flex-1 text-xl pl-4 focus:outline-hidden [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="text"
            onChange={(e) => {
                onChange(e.target.value);
            }}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder=""
        />
    )
}