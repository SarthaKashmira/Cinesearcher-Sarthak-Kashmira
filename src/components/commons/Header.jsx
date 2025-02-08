import { memo } from "react";

const Header = ({ actionBlock }) => <div className="m-2">{actionBlock}</div>;

export default memo(Header);
