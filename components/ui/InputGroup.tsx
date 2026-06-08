import type { ComponentProps, ReactNode } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type InputProps = ComponentProps<typeof Input>;

interface AppInputGroupProps {
	label: ReactNode;
	icon?: ReactNode;
	inputProps?: InputProps;
	textFieldClassName?: string;
	groupClassName?: string;
	prefixClassName?: string;
	size?: "sm" | "md" | "default" | "lg" | "xl";
}

export function AppInputGroup({
	label,
	icon,
	inputProps,
	textFieldClassName = 'w-full space-y-2',
	groupClassName = 'relative w-full',
	prefixClassName = 'absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant z-10',
	size,
}: AppInputGroupProps) {
	const inputSize = size || inputProps?.size || 'xl';
	return (
		<div className={textFieldClassName}>
			<Label htmlFor={inputProps?.id} className="text-sm font-semibold text-on-surface">
				{label}
			</Label>
			<div className={groupClassName}>
				{icon ? <div className={prefixClassName}>{icon}</div> : null}
				<Input
					size={inputSize}
					{...inputProps}
					className={cn(
						"bg-surface border-outline-variant focus-visible:ring-primary shadow-sm",
						icon ? 'pl-10' : 'pl-4',
						inputProps?.className
					)}
				/>
			</div>
		</div>
	);
}
