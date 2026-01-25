export default function Loader({ size = 46 }) {
    return (
        <div
            className="animate-spin rounded-full border-[5px] border-(--border-default)/40 border-t-(--primary)"
            style={{ width: size, height: size }}
        />
    );
}
