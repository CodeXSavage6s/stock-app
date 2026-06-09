import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Controller } from 'react-hook-form'

export default function SelectField({
  name, label, placeholder, options, control, error, required = false
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} >
        {label}
      </Label>
      <Controller 
        name={name}
        control={control}
        rules={{required: required ? `Please select ${label.toLowerCase()}` : false}}
        render={({ field }) => 
          <Select value={field.value} onValueChange={field.onChange}  >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600 text-gray-300 w-full">
              {options.map(opt => (
              <SelectItem value={opt.value} key={opt.value} >
                {opt.label}
              </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
    </div>
    )
}