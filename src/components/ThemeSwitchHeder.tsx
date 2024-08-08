import whereIAm from "@/libs/whereIAm";
import { ToggleSwitch } from "./ToggleSwitch";

export function ThemeSwitchHeder() {
  whereIAm("ThemeSwitchHeder");
  return (
    <div className="d-flex flex-row-reverse page mt-2">
      <ToggleSwitch />
    </div>
  );
}
