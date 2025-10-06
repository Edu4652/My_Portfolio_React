import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import React, { memo } from 'react';
import { cn } from '@/utils';

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors', {
	variants: {
		variant: {
			default: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
			primary: 'bg-blue-500 text-white',
			secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
			success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
			warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
			error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
			purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
			glass: 'bg-white/10 backdrop-blur-sm text-white border border-white/20',
		},
		size: {
			sm: 'px-2 py-0.5 text-xs',
			md: 'px-2.5 py-0.5 text-sm',
			lg: 'px-3 py-1 text-base',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
});

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
	readonly children: React.ReactNode;
	readonly animated?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	({ className, variant, size, children, animated = false, style, ...props }, ref) => {
		if (animated) {
			return (
				<motion.span
					ref={ref}
					className={cn(badgeVariants({ variant, size, className }))}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.2 }}
					style={style}
				>
					{children}
				</motion.span>
			);
		}

		return (
			<span ref={ref} className={cn(badgeVariants({ variant, size, className }))} style={style} {...props}>
				{children}
			</span>
		);
	},
);

Badge.displayName = 'Badge';

export default memo(Badge);
export { Badge, badgeVariants };
export type { BadgeProps };
