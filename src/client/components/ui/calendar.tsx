"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  showOutsideDays?: boolean;
  mode?: "single" | "multiple" | "range";
};

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  showOutsideDays = true,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date()
  );

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth.getMonth() &&
      selected.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleDayClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    if (disabled && disabled(date)) return;
    onSelect?.(date);
  };

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

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const renderDays = () => {
    const days = [];
    const totalSlots = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        dayNumber
      );
      const isDisabled = disabled && isCurrentMonth ? disabled(date) : false;

      if (!isCurrentMonth && !showOutsideDays) {
        days.push(
          <div key={i} className="h-9 w-9 p-0" />
        );
      } else if (!isCurrentMonth) {
        days.push(
          <div
            key={i}
            className="h-9 w-9 p-0 text-center text-sm text-muted-foreground opacity-50"
          />
        );
      } else {
        days.push(
          <button
            key={i}
            onClick={() => handleDayClick(dayNumber)}
            disabled={isDisabled}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal",
              isToday(dayNumber) && "bg-accent text-accent-foreground",
              isSelected(dayNumber) &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              isDisabled && "text-muted-foreground opacity-50 cursor-not-allowed"
            )}
          >
            {dayNumber}
          </button>
        );
      }
    }

    return days;
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="space-y-4">
        <div className="flex justify-center pt-1 relative items-center">
          <button
            onClick={previousMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-sm font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button
            onClick={nextMonth}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <table className="w-full border-collapse space-y-1">
          <thead>
            <tr className="flex">
              {dayNames.map((day) => (
                <th
                  key={day}
                  className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(
              { length: Math.ceil((firstDayOfMonth + daysInMonth) / 7) },
              (_, weekIndex) => (
                <tr key={weekIndex} className="flex w-full mt-2">
                  {renderDays().slice(weekIndex * 7, (weekIndex + 1) * 7)}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
