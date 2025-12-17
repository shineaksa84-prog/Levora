import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { SpotlightCard } from "./SpotlightCard";

export const BentoGrid = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    colSpan = 1,
}) => {
    return (
        <SpotlightCard
            className={cn(
                "row-span-1 group/bento transition duration-200 p-4 justify-between flex flex-col space-y-4",
                colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
                colSpan === 3 ? "md:col-span-3" : "",
                className
            )}
            spotlightColor="rgba(99, 102, 241, 0.1)"
        >
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col space-y-4"
            >
                {header}
                <div className="group-hover/bento:translate-x-2 transition duration-200">
                    {icon}
                    <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                        {description}
                    </div>
                </div>
            </motion.div>
        </SpotlightCard>
    );
};
