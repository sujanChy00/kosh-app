import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';

type Props = React.ComponentProps<typeof DateTimePicker> & {
  materialDateClassName?: string;
  materialDateLabel?: string;
  materialDateLabelClassName?: string;
  materialTimeClassName?: string;
  materialTimeLabel?: string;
  materialTimeLabelClassName?: string;
  onValueChange?: (date?: Date) => void;
};

export function TimePicker({
  materialDateClassName: _materialDateClassName,
  materialDateLabel: _materialDateLabel,
  materialDateLabelClassName: _materialDateLabelClassName,
  materialTimeClassName: _materialTimeClassName,
  materialTimeLabel: _materialTimeLabel,
  materialTimeLabelClassName: _materialTimeLabelClassName,
  onValueChange,
  ...props
}: Props) {
  const [date, setDate] = React.useState<Date>(props.value || new Date());
  return (
    <DateTimePicker
      {...props}
      value={date}
      mode="time"
      onChange={(event, date) => {
        if (date) {
          setDate(date);
          onValueChange?.(date);
        }
      }}
    />
  );
}
