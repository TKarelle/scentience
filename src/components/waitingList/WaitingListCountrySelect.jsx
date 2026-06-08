import { WAITING_LIST_COUNTRY_OPTIONS } from "../../config/waitingListForm";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const cx = (...parts) => parts.filter(Boolean).join(" ");

/**
 * Select pays — options communes journey / modal.
 */
export default function WaitingListCountrySelect({
  id,
  value,
  onChange,
  required = true,
  selectClassName,
  wrapperClassName,
  chevronClassName,
  "aria-label": ariaLabel = "Country",
}) {
  return (
    <div className={cx("relative", wrapperClassName)}>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={ariaLabel}
        className={selectClassName}
      >
        {WAITING_LIST_COUNTRY_OPTIONS.map(({ value: optionValue, label }) => (
          <option
            key={optionValue === "" ? "_placeholder" : optionValue}
            value={optionValue}
          >
            {label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className={
          chevronClassName ??
          "pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-mist"
        }
      />
    </div>
  );
}
