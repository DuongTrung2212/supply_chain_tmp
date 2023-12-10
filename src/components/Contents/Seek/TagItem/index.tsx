import { Tooltip } from 'antd';
import React from 'react';

export default function TagItem({
  label,
  value,
  labelClassName,
}: {
  label?: string;
  labelClassName?: string;
  value?: string;
  valueClassName?: string;
}) {
  return (
    <div className="w-full flex flex-col">
      {label && (
        <Tooltip title={label} trigger={['click']}>
          <p
            className={`text-[#4A4A4A] truncate px-[10px] py-[5px] font-semibold text-[25px] max-sm:text-[10px] ${labelClassName}`}
          >
            {label}
          </p>
        </Tooltip>
      )}
      <Tooltip title={value} trigger={['click']}>
        <p
          className={`w-full rounded-full truncate px-[10px] py-[5px] bg-white text-[#4A4A4A] font-semibold max-sm:text-[7px] ${labelClassName}`}
        >
          {value}
        </p>
      </Tooltip>
    </div>
  );
}
