import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

type CheckboxSize = "small" | "medium" | "large" | "extraLarge";

interface CheckboxProps
	extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
	size?: CheckboxSize;
}

const sizeMapping: Record<CheckboxSize, string> = {
	small: "w-3 h-3",
	medium: "w-4 h-4",
	large: "w-5 h-5",
	extraLarge: "w-6 h-6",
};

const iconSizeMapping: Record<CheckboxSize, string> = {
	small: "w-2 h-2",
	medium: "w-3 h-3",
	large: "w-4 h-4",
	extraLarge: "w-5 h-5",
};

function Checkbox({ className, size = "medium", ...props }: CheckboxProps) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				sizeMapping[size],
				"peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<CheckIcon className={iconSizeMapping[size]} />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
