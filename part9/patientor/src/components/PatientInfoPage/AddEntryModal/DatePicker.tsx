import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers";

interface NammedDatePickerProps<TDate> extends DatePickerProps<TDate> {
  name?: string;
}

function NammedDatePicker<TDate>({
  name,
  ...props
}: NammedDatePickerProps<TDate>) {
  return (
    <DatePicker
      inputRef={(ref) => {
        if (ref !== null && name !== undefined) {
          ref.setAttribute("name", name);
        }
      }}
      {...props}
    />
  );
}

export default NammedDatePicker;
