import React from 'react'
import Select from 'react-select'

export const SelectField: React.SFC<any> = ({
  options,
  field,
  form,
}) => (
  <Select
    options={options}
    name={field.name}
    value={options ? options.find((option: any) => option.value === field.value) : ''}
    onChange={(option: any) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
  />
)