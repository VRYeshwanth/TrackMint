export default function Toast({
    type = "info",
    message,
    description,
    onClose,
}) {
    const styles = {
        success: {
            icon: "check_circle",
            bg: "bg-white dark:bg-(--card-bg)",
            iconColor: "text-green-600",
            bar: "bg-green-500",
            border: "border-green-500/30",
        },
        error: {
            icon: "cancel",
            bg: "bg-white dark:bg-(--card-bg)",
            iconColor: "text-red-600",
            bar: "bg-red-500",
            border: "border-red-500/30",
        },
        info: {
            icon: "info",
            bg: "bg-white dark:bg-(--card-bg)",
            iconColor: "text-blue-600",
            bar: "bg-blue-500",
            border: "border-blue-500/30",
        },
        warning: {
            icon: "warning",
            bg: "bg-white dark:bg-(--card-bg)",
            iconColor: "text-yellow-600",
            bar: "bg-yellow-500",
            border: "border-yellow-500/30",
        },
    };

    const s = styles[type];

    return (
        <div
            className={`relative w-full sm:w-90 rounded-2xl shadow-lg p-4 pr-10 ${s.bg} animate-[fadeIn_.3s_ease]`}
        >
            <div className="flex gap-3 items-start">
                <span className={`material-symbols-rounded ${s.iconColor}`}>
                    {s.icon}
                </span>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-(--text-primary)">
                        {message}
                    </p>
                    {description && (
                        <p className="text-xs text-(--text-secondary) mt-1">
                            {description}
                        </p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="text-(--text-secondary) hover:text-(--text-primary) cursor-pointer"
                >
                    <span className="material-symbols-rounded text-base">
                        close
                    </span>
                </button>
            </div>

            <div
                className={`absolute bottom-0 left-0 h-1 w-full ${s.bar} animate-[shrink_4s_linear_forwards] rounded-b-2xl`}
            />
        </div>
    );
}
