import { memo } from "react";

const Header = ({ actionBlock }) => (
  <div className="m-2">
    {actionBlock}
    <hr className="neeto-ui-bg-black h-1" />
  </div>
);

export default memo(Header);
