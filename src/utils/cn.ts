import clsx, { type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customMerge = extendTailwindMerge({
    override: {
        classGroups: {
            "bg-color": ["bg-background", "bg-button-primary-sahdow", "bg-button-secondary-shadow"],
        },
    },
});

export function cn(...classes: ClassValue[]) {
    return customMerge(clsx(classes));
}
