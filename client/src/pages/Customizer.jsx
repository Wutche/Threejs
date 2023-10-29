/** @format */

import { motion, AnimatePresence } from "framer-motion";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
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
import { useState } from "react";

const Customizer = () => {
	const snap = useSnapshot(state);

	const [file, setFile] = useState("");

	const [prompt, setprompt] = useState("");
	const [generatingImg, setgeneratingImg] = useState(false);

	const [activeEditorTab, setactiveEditorTab] = useState("");
	const [activeFilterTab, setactiveFilterTab] = useState({
		logoShirt: true,
		stylishShirt: false,
	});

	// handle file upload

	// show tab content depending on the activeTab
	const generateTabContent = () => {
		switch (activeEditorTab) {
			case "colorpicker":
				return <ColorPicker />;
			case "filepicker":
				return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
			case "aipicker":
				return <Aipicker />;
			default:
				return null;
		}
	};

	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type];
		state[decalType.stateProperty] = result;

		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab);
		}
	};

	const handleActiveFilterTab = (tabname) => {
		switch (tabname) {
			case "logoShirt":
				state.isLogoTexture = !activeFilterTab[tabname];
				break;
			case "sylishShirt":
				state.isFullTexture = !activeFilterTab[tabname];

			default:
				state.isLogoTexture = true;
				state.isFullTexture = false;
		}

		// after setting the state, activeFilterTab is updated
		setactiveFilterTab((prevState) => {
			return {
				...prevState,
				[tabname]: !prevState[tabname],
			};
		});
	};

	const readFile = (type) => {
		reader(file).then((result) => {
			handleDecals(type, result);
			setactiveEditorTab("");
		});
	};
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
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => setactiveEditorTab(tab.name)}
									/>
								))}
								{generateTabContent()}
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
								isActive={activeFilterTab[tab.name]}
								tab={tab}
								handleClick={() => handleActiveFilterTab(tab.name)}
							/>
						))}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
