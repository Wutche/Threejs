/** @format */

import { AnimatePresence, motion } from "framer-motion";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

const Customizer = () => {
	return (
		<div>
			<h1>Customizer</h1>
		</div>
	);
};

export default Customizer;
