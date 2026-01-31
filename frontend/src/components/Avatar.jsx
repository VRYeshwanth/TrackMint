export default function Avatar({ name = "", size = "md" }) {
    const getInitials = (name) => {
        if (!name || typeof name !== "string") return "";

        const words = name
            .trim()
            .split(" ")
            .filter((word) => word.length > 0);

        const firstLetter = words[0]?.charAt(0) || "";
        const secondLetter = words[1]?.charAt(0) || "";

        return (firstLetter + secondLetter).toUpperCase();
    };

    const sizeClasses = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-14 h-14 text-base",
    };

    return (
        <div
            className={`
                ${sizeClasses[size]}
                flex items-center justify-center rounded-full font-semibold
                bg-(--primary)/15 text-(--primary)
                dark:bg-(--primary)/25
                select-none
            `}
        >
            {getInitials(name)}
        </div>
    );
}
