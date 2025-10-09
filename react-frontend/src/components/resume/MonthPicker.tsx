import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MonthPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function parseMonthString(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!year || !month) return undefined;
  return new Date(year, month - 1, 1);
}

function formatMonthString(date: Date | undefined): string {
  if (!date) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MonthPicker = ({ value, onChange, placeholder = "Select month", disabled, className }: MonthPickerProps) => {
  const initial = useMemo(() => parseMonthString(value) ?? new Date(), [value]);
  const [open, setOpen] = useState(false);
  const [displayedMonth, setDisplayedMonth] = useState<Date>(initial);

  const selectedLabel = useMemo(() => {
    const d = parseMonthString(value);
    if (!d) return placeholder;
    return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
  }, [value, placeholder]);

  const fromYear = 1970;
  const toYear = new Date().getFullYear() + 10;
  const years = useMemo(() => Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i), [fromYear, toYear]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          type="button"
          variant="outline"
          disabled={disabled}
          className={`w-full justify-start text-left font-medium border-0 bg-gradient-primary text-white hover:shadow-button rounded-xl transition-all ${className || ""}`.trim()}
        >
          <CalendarIcon className="mr-2 h-4 w-4 opacity-90" />
          <span className="truncate">{selectedLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-2xl bg-glass-bg backdrop-blur-glass border border-glass-border shadow-glass" align="start">
        <div className="p-3 pb-0">
          <div className="flex items-center gap-2 mb-2">
            <Select
              value={String(displayedMonth.getMonth())}
              onValueChange={(val) => {
                const m = Number(val);
                setDisplayedMonth(new Date(displayedMonth.getFullYear(), m, 1));
              }}
            >
              <SelectTrigger className="min-w-[160px] bg-white/90 dark:bg-white/10 border-2 border-primary/20 rounded-lg">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-primary/20 bg-white/95 dark:bg-neutral-900/95 shadow-xl">
                {monthNames.map((label, idx) => (
                  <SelectItem key={label} value={String(idx)} className="cursor-pointer">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={String(displayedMonth.getFullYear())}
              onValueChange={(val) => {
                const y = Number(val);
                setDisplayedMonth(new Date(y, displayedMonth.getMonth(), 1));
              }}
            >
              <SelectTrigger className="min-w-[120px] bg-white/90 dark:bg-white/10 border-2 border-primary/20 rounded-lg">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-primary/20 bg-white/95 dark:bg-neutral-900/95 shadow-xl max-h-64">
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)} className="cursor-pointer">
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Calendar
          mode="single"
          month={displayedMonth}
          onMonthChange={setDisplayedMonth}
          selected={initial}
          onSelect={(date) => {
            setOpen(false);
            if (!date) return;
            onChange(formatMonthString(date));
          }}
          fromYear={fromYear}
          toYear={toYear}
          initialFocus
          className="p-3 pt-0"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
            day_today: "bg-accent/60 text-accent-foreground rounded-md",
            day: "h-9 w-9 p-0 font-normal",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};


