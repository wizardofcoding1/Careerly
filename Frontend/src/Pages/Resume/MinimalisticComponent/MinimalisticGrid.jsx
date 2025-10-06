import {motion} from "framer-motion";
import MinimalisticCard from "./MinimalisticCard";

export default function MinimalisticGrid({files, onPreview, onDownload }){

    return(
        <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.4}}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        >
            {
                files.map((file,idx)=>(
                    <MinimalisticCard 
                        key={idx} 
                        file={file}
                        onPreview={onPreview}
                        onDownload={onDownload}
                    />
                ))
            }
        </motion.div>

    );
}