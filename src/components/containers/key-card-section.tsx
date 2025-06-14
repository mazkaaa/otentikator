import { useSettings } from "@/contexts/settings-provider";
import type { IKeyCard } from "@/types/key-card";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { useCallback, useMemo } from "react";
import { KeyCard } from "../reusables/key-card";
import { Checkbox } from "../ui/checkbox";

interface PROPS {
	data: IKeyCard[];
}
const KeyCardSection = (props: PROPS) => {
	const { data } = props;
	const { isSelecting, selectedKeys, selectKey, unselectKey } = useSettings();

	const handleCheck = useCallback(
		(checked: CheckedState, otp: IKeyCard) => {
			if (checked) {
				selectKey(otp);
			} else {
				unselectKey(otp);
			}
		},
		[selectKey, unselectKey],
	);

	const defineCheckbox = useCallback(
		(otp: IKeyCard) => {
			if (isSelecting) {
				return (
					<Checkbox
						checked={selectedKeys.some((item) => item.id === otp.id)}
						onCheckedChange={(checked) => {
							handleCheck(checked, otp);
						}}
						size="extraLarge"
					/>
				);
			}
		},
		[handleCheck, isSelecting, selectedKeys],
	);

	const defineGridContent = useMemo(() => {
		return (
			<>
				{data.map((otp) => (
					<div
						key={otp.id}
						className="flex flex-row items-center w-full space-x-6"
					>
						<KeyCard data={otp} />
						{defineCheckbox(otp)}
					</div>
				))}
			</>
		);
	}, [data, defineCheckbox]);

	return (
		<section className="space-y-4 transition-all">{defineGridContent}</section>
	);
};

export default KeyCardSection;
