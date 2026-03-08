import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        fixed bottom-6 right-6
        flex items-center gap-2
        bg-[rgba(30,20,60,0.9)]
        backdrop-blur-xl
        text-white
        px-5 py-3
        rounded-md
        text-sm
        border border-purple-400/30
        border-l-4 border-l-purple-500
        shadow-2xl
        animate-slideInRight
        z-[1000]
      "
    >
      <span>⚠️</span>
      {message}
    </div>
  );
}