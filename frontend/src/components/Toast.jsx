import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ type = "info", message, closeToast }) {
  const types = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      textColor: "text-green-900",
    },
    error: {
      icon: XCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      textColor: "text-red-900",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      textColor: "text-yellow-900",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-900",
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  return (
    <div
      role="status"
      className={`relative ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 flex items-start space-x-3 min-w-[320px] max-w-md`}
    >
      {/* Close button (absolute, aligned top-right) */}
      <button
        onClick={() => closeToast && closeToast()}
        aria-label="Close notification"
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
      >
        <X className="w-4 h-4 text-gray-600 cursor-pointer" />
      </button>

      <Icon className={`${config.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className={`${config.textColor} text-sm font-medium`}>{message}</p>
      </div>
    </div>
  );
}
