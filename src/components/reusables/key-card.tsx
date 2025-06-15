import { cn } from "@/lib/utils";
import type { IOTPFormat } from "@/types/otp-format";
import { Check, Copy } from "lucide-react";
import * as OTPAuth from "otpauth";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface PROPS {
	data: IOTPFormat;
	className?: string;
}
export const KeyCard = (props: PROPS) => {
	const { data, className } = props;
	const [percentage, setPercentage] = useState(
		Math.floor(
			((data.period - (Math.floor(Date.now() / 1000) % data.period)) /
				data.period) *
				100,
		),
	);
	const [successCopy, setSuccessCopy] = useState(false);
	const [generatedTotpToken, setGeneratedTotpToken] = useState<string>("");

	// Reference to manage the timeout for clipboard success message
	const timeoutClipboardRef = useRef<NodeJS.Timeout | null>(null);

	// Create a TOTP token instance using the provided data
	const totpToken = useMemo(() => {
		const { algorithm, digits, issuer, label, period, secret } = data;
		return new OTPAuth.TOTP({
			algorithm,
			digits,
			issuer,
			label,
			period,
			secret,
		});
	}, [data]);

	// Function to handle copying the token to clipboard
	const handleCopyToClipboard = useCallback(async () => {
		if (generatedTotpToken) {
			try {
				await navigator.clipboard.writeText(generatedTotpToken);
				toast.success("Copied to clipboard");
				setSuccessCopy(true);
				if (timeoutClipboardRef.current) {
					clearTimeout(timeoutClipboardRef.current);
				}
				timeoutClipboardRef.current = setTimeout(() => {
					setSuccessCopy(false);
				}, 1500);
			} catch (error) {
				toast.error("Failed to copy to clipboard");
				console.error("Copy to clipboard failed:", error);
			}
		}
	}, [generatedTotpToken]);

	// Define the status icon based on the token state
	const defineStatusIcon = useMemo(() => {
		if (generatedTotpToken) {
			if (successCopy) {
				return <Check className="w-4" />;
			}
			return <Copy className="w-4" />;
		}
		return null;
	}, [successCopy, generatedTotpToken]);

	// Generate the TOTP token every second
	useEffect(() => {
		const updateToken = () => setGeneratedTotpToken(totpToken.generate());
		const interval = setInterval(updateToken, 1000);
		return () => clearInterval(interval);
	}, [totpToken]);

	// Clear the timeout when the component unmounts
	useEffect(() => {
		return () => {
			if (timeoutClipboardRef.current) {
				clearTimeout(timeoutClipboardRef.current);
			}
		};
	}, []);

	// Decrements the percentage every second based on the token's period
	useEffect(() => {
		const interval = setInterval(() => {
			const period = totpToken.period;
			const now = Math.floor(Date.now() / 1000);
			const elapsed = now % period;
			setPercentage(Math.floor(((period - elapsed) / period) * 100));
		}, 1000);

		return () => clearInterval(interval);
	}, [totpToken]);

	return (
		<button
			type="button"
			onClick={handleCopyToClipboard}
			className={cn(
				"border w-full flex flex-col rounded-md transition-all relative cursor-pointer",
				{
					"border-muted-foreground": percentage >= 20,
					"border-destructive": percentage <= 20,
				},
				className,
			)}
		>
			<section className="flex flex-row justify-between items-center py-4 px-6">
				<aside className="flex flex-col">
					<span className="font-semibold text-xl leading-tight">
						{data.issuer}
					</span>
					<span className="leading-tight">{data.label}</span>
				</aside>
				<aside>
					<div className="flex items-center space-x-2 transition-all">
						<span className="text-4xl font-bold text-zinc-800 tabular-nums">
							{generatedTotpToken.replace(/(.{3})/g, "$1 ").trim()}
						</span>
						{defineStatusIcon}
					</div>
				</aside>
			</section>
			<div
				className={cn(
					"h-full bg-muted-foreground absolute opacity-10 transition-all duration-300",
				)}
				style={{
					width: `${percentage}%`,
				}}
			/>
		</button>
	);
};
