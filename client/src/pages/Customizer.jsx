/** @format */

import { motion, AnimatePresence } from "framer-motion";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
	Aipicker,
	ColorPicker,
	FilePicker,
	Tab,
	CustomButton,
} from "../components";
import { useSnapshot } from "valtio";

const Customizer = () => {
	const snap = useSnapshot(state);
	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key={"custom"}
						className="absolute top-0 left-0 z-10"
						{...slideAnimation("left")}>
						<div className="flex items-center min-h-screen">
							<div className="editortabs-container tabs">
								{EditorTabs.map((tab) => (
									<Tab key={tab.name} tab={tab} handleClick={() => {}} />
								))}
							</div>
						</div>
					</motion.div>

					<motion.div
						className="absolute z-10 top-5 right-5"
						{...fadeAnimation}>
						<CustomButton
							type={"filled"}
							title={"Go back"}
							handleClick={() => (state.intro = true)}
						/>
					</motion.div>

					<motion.div
						className="filtertabs-container"
						{...slideAnimation("up")}>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.name}
								isFilter
								isActive=""
								tab={tab}
								handleClick={() => {}}
							/>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
