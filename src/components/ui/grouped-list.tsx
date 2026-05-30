import * as React from "react"
import { cn } from "@/lib/utils"

function GroupedList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card divide-y divide-border overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function GroupedListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-4 py-3 transition-colors hover:bg-accent/50",
        className
      )}
      {...props}
    />
  )
}

export { GroupedList, GroupedListItem }
