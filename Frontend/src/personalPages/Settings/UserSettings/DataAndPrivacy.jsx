import React from 'react'
import { motion } from "framer-motion";
const DataAndPrivacy = () => {
    return (
        <div className="space-y-4">
            <div className="text-cyan-400 font-mono">[ PERMISSIONS MATRIX ]</div>
            {['Camera', 'Microphone', 'Location', 'Notifications'].map((perm, i) => (
                <motion.div
                    key={perm}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 bg-black/20 border border-cyan-500/20 rounded-lg"
                >
                    <span className="font-mono text-sm">{perm}</span>

                </motion.div>
            ))}
        </div>
    )
}

export default DataAndPrivacy