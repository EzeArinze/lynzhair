import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

interface PasswordStrengthProps {
  passwordStrength: number;
  strengthText: string[];
  strengthColor: string[];
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
}

function PasswordStrength({
  passwordStrength,
  strengthText,
  strengthColor,
  hasMinLength,
  hasUppercase,
  hasLowercase,
  hasNumber,
}: PasswordStrengthProps) {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              strengthColor[passwordStrength - 1] || "bg-gray-200"
            }`}
            style={{
              width: `${(passwordStrength / 5) * 100}%`,
            }}
          ></div>
        </div>
        <span className="text-xs font-medium">
          {passwordStrength > 0 ? strengthText[passwordStrength - 1] : ""}
        </span>
      </div>

      <ul className="space-y-1 text-xs text-gray-500 mt-2">
        <li className="flex items-center">
          {hasMinLength ? (
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 text-gray-300 mr-1" />
          )}
          At least 8 characters
        </li>
        <li className="flex items-center">
          {hasUppercase ? (
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 text-gray-300 mr-1" />
          )}
          At least one uppercase letter
        </li>
        <li className="flex items-center">
          {hasLowercase ? (
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 text-gray-300 mr-1" />
          )}
          At least one lowercase letter
        </li>
        <li className="flex items-center">
          {hasNumber ? (
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 text-gray-300 mr-1" />
          )}
          At least one number
        </li>
      </ul>
    </div>
  );
}

export default PasswordStrength;
