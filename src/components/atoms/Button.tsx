import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '@/utils';

/**
 * Button component variants using class-variance-authority
 * Provides consistent styling with multiple variants
 */
const buttonVariants = cva(
	// Base styles for all button variants
	'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
	{
		variants: {
			variant: {
				primary:
					'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
				secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20',
				outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
				ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
				glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
			},
			size: {
				sm: 'px-3 py-1.5 text-sm',
				md: 'px-4 py-2 text-base',
				lg: 'px-6 py-3 text-lg',
				xl: 'px-8 py-4 text-xl',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
);

// Button props interface extending variant props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	children: React.ReactNode;
	loading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
}

/**
 * Reusable Button component with multiple variants and animations
 * Follows atomic design principles with consistent styling
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, loading = false, icon, iconPosition = 'left', disabled, ...props }, ref) => {
		return (
			<motion.button
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				disabled={disabled || loading}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				transition={{ duration: 0.2 }}
				onClick={props.onClick}
				onMouseEnter={props.onMouseEnter}
				onMouseLeave={props.onMouseLeave}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
			>
				{loading ? (
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
						Cargando...
					</div>
				) : (
					<div className="flex items-center gap-2">
						{icon && iconPosition === 'left' && icon}
						{children}
						{icon && iconPosition === 'right' && icon}
					</div>
				)}
			</motion.button>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps };
